const K8sContainerLogFlow = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-gray-900 mb-6">K8s 컨테이너 로그 처리 흐름: Fluentd에서 OpenSearch Dashboards까지</h1>
      <div className="space-y-8 text-lg text-gray-700">
        <section>
          <h2 className="text-3xl font-semibold text-gray-800 mb-4">개요: Kubernetes 로그의 여정</h2>
          <p>
            Kubernetes 환경에서 서비스가 동작하면서 발생하는 컨테이너 로그는 시스템의 상태를 파악하고 문제 발생 시 디버깅하는 데 필수적인 정보입니다. Fluentd, OpenSearch, 그리고 OpenSearch Dashboards의 조합은 이러한 컨테이너 로그를 효율적으로 수집, 저장, 분석 및 시각화하는 강력한 솔루션을 제공합니다.
          </p>
          <p>
            이 페이지에서는 Kubernetes 클러스터 내에서 컨테이너 로그가 Fluentd를 통해 수집되고, OpenSearch에 저장된 후, OpenSearch Dashboards에서 어떻게 시각화되는지 그 전체적인 흐름을 상세한 설정 예제와 함께 설명합니다.
          </p>
        </section>

        <section>
          <h2 className="text-3xl font-semibold text-gray-800 mb-4">1. 컨테이너 로그 수집 (Fluentd Source)</h2>
          <p>
            Kubernetes에서 Fluentd는 주로 DaemonSet으로 배포되어 각 노드에서 실행됩니다. Fluentd는 노드의 파일 시스템에 저장된 컨테이너 로그 파일(일반적으로 <code>/var/log/containers/*.log</code>)을 <code>tail</code> 플러그인을 사용하여 실시간으로 읽어들입니다.
          </p>
          <h3 className="text-2xl font-medium text-gray-700 mt-6 mb-3">Fluentd Source 설정 예제:</h3>
          <div className="bg-gray-800 p-6 rounded-lg text-white font-mono text-sm overflow-x-auto mt-4">
            <pre>
{`# fluentd.conf (Source for Kubernetes Container Logs)
<source>
  @type tail
  @id input_container_logs
  path /var/log/containers/*.log
  pos_file /var/log/td-agent/containers.log.pos
  tag kubernetes.* # 모든 컨테이너 로그에 'kubernetes' 태그 부여
  read_from_head true # Fluentd 시작 시 파일의 처음부터 읽기 시작
  <parse>
    @type json # 컨테이너 로그는 보통 JSON 형식 (Docker/CRI-O)
    time_format %Y-%m-%dT%H:%M:%S.%NZ
  </parse>
</source>`}
            </pre>
          </div>
          <p className="mt-4">
            <code>path /var/log/containers/*.log</code>는 모든 컨테이너의 로그 파일을 대상으로 하며, <code>tag kubernetes.*</code>를 통해 수집된 로그에 <code>kubernetes</code> 태그를 부여하여 이후 필터링 및 라우팅에 활용합니다.
          </p>
        </section>

        <section>
          <h2 className="text-3xl font-semibold text-gray-800 mb-4">2. 로그 처리 및 보강 (Fluentd Filter)</h2>
          <p>
            수집된 컨테이너 로그는 원시 상태로는 분석하기 어렵습니다. Fluentd의 필터 플러그인은 로그에 Kubernetes 관련 메타데이터를 추가하고, 필요한 경우 로그 메시지를 파싱하여 구조화된 형태로 만듭니다.
          </p>
          <h3 className="text-2xl font-medium text-gray-700 mt-6 mb-3">Fluentd Filter 설정 예제:</h3>
          <div className="bg-gray-800 p-6 rounded-lg text-white font-mono text-sm overflow-x-auto mt-4">
            <pre>
{`# fluentd.conf (Filter for Kubernetes Metadata and JSON Parsing)
<filter kubernetes.**>
  @type kubernetes_metadata # Kubernetes 메타데이터 추가 필터
  @id filter_kube_metadata
</filter>

<filter kubernetes.**>
  @type parser # 로그 메시지 필드를 파싱하는 필터
  key_name log # 파싱할 필드 이름 (예: 컨테이너 로그의 'log' 필드)
  reserve_data true # 원본 데이터 보존
  remove_key_name_field true # 원본 'log' 필드 제거
  <parse>
    @type json # 로그 메시지가 JSON 형식일 경우
  </parse>
</filter>`}
            </pre>
          </div>
          <p className="mt-4">
            <code>kubernetes_metadata</code> 필터는 로그에 Pod 이름, Namespace, 컨테이너 ID 등 풍부한 컨텍스트 정보를 추가합니다. <code>parser</code> 필터는 컨테이너 로그 내의 실제 메시지가 JSON 문자열인 경우 이를 파싱하여 구조화된 필드로 변환합니다.
          </p>
        </section>

        <section>
          <h2 className="text-3xl font-semibold text-gray-800 mb-4">3. OpenSearch로 전송 (Fluentd Match/Output)</h2>
          <p>
            처리 및 보강된 로그는 이제 OpenSearch로 전송될 준비가 되었습니다. Fluentd의 <code>opensearch</code> 출력 플러그인은 로그를 OpenSearch 클러스터로 안정적으로 스트리밍합니다.
          </p>
          <h3 className="text-2xl font-medium text-gray-700 mt-6 mb-3">Fluentd Match/Output 설정 예제:</h3>
          <div className="bg-gray-800 p-6 rounded-lg text-white font-mono text-sm overflow-x-auto mt-4">
            <pre>
{`# fluentd.conf (Output to OpenSearch)
<match kubernetes.**>
  @type opensearch
  @id output_opensearch_k8s
  host opensearch-master.opensearch.svc.cluster.local # OpenSearch 서비스 주소
  port 9200
  scheme http
  user fluentd # OpenSearch 인증 사용자
  password changeme # OpenSearch 인증 비밀번호
  ssl_verify_mode false # 프로덕션 환경에서는 true 및 적절한 인증서 사용 권장

  logstash_format true # Logstash 형식의 인덱스 이름 사용 (예: logstash-fluentd-YYYY.MM.DD)
  logstash_prefix kubernetes-logs # 인덱스 이름 접두사
  include_tag_key true
  tag_key @log_name

  <buffer>
    @type file
    path /var/log/td-agent/buffer/opensearch_k8s
    flush_interval 5s
    chunk_limit_size 2MB
    queue_limit_length 8
    retry_max_interval 30s
    retry_forever true
  </buffer>
</match>`}
            </pre>
          </div>
          <p className="mt-4">
            <code>logstash_format true</code>와 <code>logstash_prefix kubernetes-logs</code>를 통해 <code>kubernetes-logs-YYYY.MM.DD</code>와 같은 일별 인덱스 패턴으로 로그가 저장되어 관리가 용이합니다. <code>buffer</code> 설정은 네트워크 문제 발생 시 로그 유실을 방지하고 안정적인 전송을 보장합니다.
          </p>
        </section>

        <section>
          <h2 className="text-3xl font-semibold text-gray-800 mb-4">4. OpenSearch에서의 저장 및 인덱싱</h2>
          <p>
            Fluentd로부터 전송받은 로그 데이터는 OpenSearch 클러스터에 저장되고 인덱싱됩니다. OpenSearch는 수신된 로그를 자동으로 분석하고 검색 가능한 필드로 분리하여 저장합니다. 이때 Fluentd의 <code>logstash_prefix</code> 설정에 따라 <code>kubernetes-logs-YYYY.MM.DD</code>와 같은 인덱스 패턴으로 데이터가 구성됩니다.
          </p>
          <p>
            이러한 인덱싱 과정을 통해 방대한 양의 로그 데이터 속에서 특정 이벤트를 빠르게 검색하고 필터링할 수 있는 기반이 마련됩니다.
          </p>
        </section>

        <section>
          <h2 className="text-3xl font-semibold text-gray-800 mb-4">5. OpenSearch Dashboards를 통한 시각화</h2>
          <p>
            OpenSearch Dashboards는 OpenSearch에 저장된 로그 데이터를 탐색하고 시각화하는 강력한 웹 인터페이스입니다. 이를 통해 운영자는 로그 데이터를 직관적으로 이해하고, 시스템 상태를 모니터링하며, 문제 발생 시 신속하게 원인을 분석할 수 있습니다.
          </p>
          <h3 className="text-2xl font-medium text-gray-700 mt-6 mb-3">주요 활용 예시:</h3>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li>
              <strong>로그 검색 및 필터링:</strong> 특정 Pod, Namespace, 컨테이너 또는 키워드를 기반으로 로그를 검색하고 필터링하여 원하는 정보를 빠르게 찾습니다.
            </li>
            <li>
              <strong>대시보드 및 시각화:</strong> 에러율, 트래픽 패턴, 리소스 사용량 등 중요한 메트릭을 시각화하여 시스템의 전반적인 상태를 한눈에 파악합니다.
            </li>
            <li>
              <strong>알림 설정:</strong> 특정 조건(예: 에러 로그 급증, 특정 키워드 발생)이 충족될 경우 Slack, 이메일 등으로 알림을 받아 신속하게 대응합니다.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-3xl font-semibold text-gray-800 mb-4">전체 로그 처리 흐름 요약</h2>
          <div className="bg-gray-100 p-6 rounded-lg font-mono text-sm overflow-x-auto">
            <pre>
Kubernetes Pods/Nodes (컨테이너 로그)
       ↓ (Fluentd Source: /var/log/containers/*.log)
Fluentd (DaemonSet)
  (Filter: kubernetes_metadata, parser)
       ↓ (Fluentd Match/Output: opensearch)
OpenSearch (저장 및 인덱싱: kubernetes-logs-YYYY.MM.DD)
       ↓
OpenSearch Dashboards (검색, 시각화, 알림)
            </pre>
          </div>
          <p className="mt-4">
            이러한 통합된 로그 처리 흐름을 통해 Kubernetes 환경에서 발생하는 모든 컨테이너 로그를 효과적으로 관리하고, 시스템의 안정성과 운영 효율성을 크게 향상시킬 수 있습니다.
          </p>
        </section>
      </div>
    </div>
  );
};

export default K8sContainerLogFlow;