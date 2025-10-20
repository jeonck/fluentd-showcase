const FluentdOpenSearchOverview = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-gray-900 mb-6">Fluentd-OpenSearch 구조적 이해</h1>
      <div className="space-y-8 text-lg text-gray-700">
        <section>
          <h2 className="text-3xl font-semibold text-gray-800 mb-4">개요: K8s 로깅의 핵심</h2>
          <p>
            Kubernetes 환경에서 애플리케이션과 인프라에서 발생하는 방대한 양의 로그를 효과적으로 수집, 저장, 분석하는 것은 매우 중요합니다. Fluentd와 OpenSearch는 이러한 요구사항을 충족시키는 강력한 조합으로, EFK (Elasticsearch, Fluentd, Kibana) 스택의 현대적인 변형인 EOFK (OpenSearch, Fluentd, OpenSearch Dashboards) 스택의 핵심 구성 요소입니다.
          </p>
          <p>
            이 페이지에서는 Fluentd와 OpenSearch가 Kubernetes 환경에서 어떻게 유기적으로 작동하여 안정적이고 확장 가능한 로그 모니터링 시스템을 구축하는지 구조적으로 이해하는 데 도움을 드립니다.
          </p>
        </section>

        <section>
          <h2 className="text-3xl font-semibold text-gray-800 mb-4">1. Fluentd: 유연한 로그 수집기</h2>
          <p>
            Fluentd는 다양한 소스에서 데이터를 수집하고, 필터링 및 변환한 후, 여러 대상으로 라우팅할 수 있는 오픈 소스 데이터 수집기입니다. 로그 수집에 최적화되어 있으며, 플러그인 기반 아키텍처를 통해 높은 유연성과 확장성을 제공합니다.
          </p>
          <h3 className="text-2xl font-medium text-gray-700 mt-6 mb-3">Kubernetes에서의 Fluentd 배포 패턴:</h3>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li>
              <strong>DaemonSet 패턴:</strong> 각 Kubernetes 노드에 Fluentd Pod를 배포하여 해당 노드의 모든 컨테이너 및 시스템 로그를 수집합니다. 이는 클러스터 전체의 로그를 중앙 집중화하는 가장 일반적인 방법입니다.
            </li>
            <li>
              <strong>Sidecar 패턴:</strong> 특정 애플리케이션 Pod 내에 Fluentd 컨테이너를 Sidecar로 함께 배포하여 해당 애플리케이션의 로그만을 수집합니다. 이는 애플리케이션별 로그 처리 로직이 필요할 때 유용합니다.
            </li>
          </ul>
          <h3 className="text-2xl font-medium text-gray-700 mt-6 mb-3">Fluentd의 주요 구성 요소:</h3>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li>
              <strong>Source:</strong> 로그 데이터를 입력받는 지점 (예: `tail` (파일), `http`, `forward`, `systemd`, `kubelet` 등).
            </li>
            <li>
              <strong>Filter:</strong> 수집된 로그 데이터를 파싱, 변환, 보강하는 역할 (예: `parser`, `grep`, `kubernetes_metadata` 등).
            </li>
            <li>
              <strong>Match/Output:</strong> 필터링된 데이터를 최종 목적지로 전송하는 역할 (예: `opensearch`, `s3`, `kafka` 등).
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-3xl font-semibold text-gray-800 mb-4">2. OpenSearch: 강력한 검색 및 분석 엔진</h2>
          <p>
            OpenSearch는 분산형 검색 및 분석 엔진으로, Elasticsearch 7.10.2를 기반으로 포크되어 개발되었습니다. 대량의 데이터를 실시간으로 저장, 검색, 분석할 수 있는 기능을 제공하며, 로그 및 이벤트 데이터 분석에 특히 강력합니다.
          </p>
          <h3 className="text-2xl font-medium text-gray-700 mt-6 mb-3">로깅 시스템에서의 OpenSearch 역할:</h3>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li>
              <strong>데이터 저장 및 인덱싱:</strong> Fluentd로부터 전송받은 로그 데이터를 효율적으로 저장하고 검색 가능한 형태로 인덱싱합니다.
            </li>
            <li>
              <strong>실시간 검색 및 분석:</strong> 저장된 로그 데이터를 기반으로 복잡한 쿼리를 수행하고, 특정 패턴이나 이상 징후를 실시간으로 탐지할 수 있습니다.
            </li>
            <li>
              <strong>확장성 및 고가용성:</strong> 분산 아키텍처를 통해 대규모 로그 데이터를 처리하고, 노드 장애 시에도 서비스 연속성을 보장합니다.
            </li>
          </ul>
          <h3 className="text-2xl font-medium text-gray-700 mt-6 mb-3">OpenSearch Dashboards: 시각화 및 모니터링</h3>
          <p>
            OpenSearch Dashboards (구 Kibana)는 OpenSearch에 저장된 데이터를 시각화하고 탐색하는 웹 기반 UI 도구입니다. 로그 데이터를 그래프, 차트, 테이블 등으로 표현하여 시스템 상태를 한눈에 파악하고, 알림 기능을 통해 중요한 이벤트 발생 시 즉시 통보받을 수 있습니다.
          </p>
        </section>

        <section>
          <h2 className="text-3xl font-semibold text-gray-800 mb-4">3. Fluentd-OpenSearch 통합 (EOF Stack)</h2>
          <p>
            Fluentd와 OpenSearch의 통합은 Kubernetes 로깅 시스템의 핵심입니다. Fluentd는 Kubernetes 클러스터의 모든 로그를 수집하여 OpenSearch로 스트리밍하고, OpenSearch는 이 데이터를 저장하고 인덱싱하여 검색 및 분석을 가능하게 합니다. OpenSearch Dashboards는 이 데이터를 시각적으로 표현하여 운영자가 시스템 상태를 모니터링하고 문제를 진단할 수 있도록 돕습니다.
          </p>
          <h3 className="text-2xl font-medium text-gray-700 mt-6 mb-3">데이터 흐름 (Conceptual Flow):</h3>
          <div className="bg-gray-100 p-6 rounded-lg font-mono text-sm overflow-x-auto">
            <pre>
Kubernetes Pods/Nodes (Application/System Logs)
       ↓
Fluentd (DaemonSet/Sidecar)
  (Source &rarr; Filter &rarr; Match/Output)
       ↓
OpenSearch (Data Storage, Indexing, Analysis)
       ↓
OpenSearch Dashboards (Visualization, Monitoring, Alerting)
            </pre>
          </div>
          <p className="mt-4">
            이러한 구조를 통해 Kubernetes 클러스터의 로그 데이터를 실시간으로 수집, 중앙화, 분석 및 시각화하여 운영 효율성을 극대화하고 문제 해결 시간을 단축할 수 있습니다.
          </p>
        </section>

        <section>
          <h2 className="text-3xl font-semibold text-gray-800 mb-4">4. Fluentd 설정 파일 예제</h2>
          <p>
            아래는 Fluentd의 주요 구성 요소인 Source, Filter, Match/Output을 보여주는 간단한 설정 파일 예제입니다. 이 예제는 Nginx 액세스 로그를 수집하여 OpenSearch로 전송하는 시나리오를 가정합니다.
          </p>
          <div className="bg-gray-800 p-6 rounded-lg text-white font-mono text-sm overflow-x-auto mt-4">
            <pre>
{`# fluentd.conf

# 1. SOURCE: Input plugin to collect logs
# =======================================
# This source tails a file, similar to \`tail -f\`.
# It's commonly used for application logs written to files.
<source>
  @type tail
  @id input_tail_access_log
  path /var/log/nginx/access.log  # Path to the log file
  pos_file /var/log/td-agent/nginx_access.log.pos # Stores the last read position
  tag nginx.access                # Tag for these logs (e.g., nginx.access)
  <parse>
    @type nginx                   # Use the built-in Nginx parser
  </parse>
</source>

# If running in Kubernetes, you might use a source like this for container logs:
# <source>
#   @type tail
#   @id input_tail_container_logs
#   path /var/log/containers/*.log
#   pos_file /var/log/td-agent/containers.log.pos
#   tag kubernetes.*
#   <parse>
#     @type json
#     time_format %Y-%m-%dT%H:%M:%S.%NZ
#   </parse>
# </source>


# 2. FILTER: Process and enrich logs
# ===================================
# This filter adds Kubernetes metadata to logs if they have a 'kubernetes' tag.
# This is crucial for enriching logs with pod name, namespace, container name, etc.
<filter kubernetes.**>
  @type kubernetes_metadata
  @id filter_kube_metadata
  # host fluentd.svc.cluster.local # If running in K8s, specify kube-api server host
  # port 443
  # ca_file /var/run/secrets/kubernetes.io/serviceaccount/ca.crt
  # verify_ssl false
</filter>

# You can add other filters, e.g., to parse JSON logs if your application outputs JSON
# <filter nginx.access>
#   @type parser
#   key_name log
#   <parse>
#     @type json
#   </parse>
# </filter>


# 3. MATCH/OUTPUT: Send processed logs to a destination
# =====================================================
# This match block sends all logs tagged with 'nginx.access' or 'kubernetes'
# (or any tag matching **) to OpenSearch.
<match **>
  @type opensearch
  @id output_opensearch
  host opensearch-master.opensearch.svc.cluster.local # OpenSearch host (e.g., in K8s)
  port 9200
  scheme http
  log_level info
  user fluentd
  password changeme
  ssl_verify_mode false # Use true in production with proper certs

  # Index settings
  logstash_format true
  logstash_prefix logstash-fluentd # Index name prefix (e.g., logstash-fluentd-YYYY.MM.DD)
  include_tag_key true
  tag_key @log_name

  # Buffer settings for reliability
  <buffer>
    @type file
    path /var/log/td-agent/buffer/opensearch
    flush_interval 5s
    chunk_limit_size 2MB
    queue_limit_length 8
    retry_max_interval 30s
    retry_forever true
  </buffer>
</match>`}
            </pre>
          </div>
        </section>
      </div>
    </div>
  );
};

export default FluentdOpenSearchOverview;