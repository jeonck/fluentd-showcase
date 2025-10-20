const KubernetesSourceExample = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-gray-900 mb-6">Kubernetes 소스 예제</h1>
      <div className="space-y-6 text-lg text-gray-700">
        <p>
          Kubernetes 환경에서 컨테이너 로그를 수집하기 위한 Fluentd 소스 설정 예제입니다. 주로 DaemonSet으로 배포된 Fluentd가 노드의 컨테이너 로그 파일을 읽을 때 사용됩니다.
        </p>
        <div className="bg-gray-800 p-6 rounded-lg text-white font-mono text-sm overflow-x-auto mt-4">
          <pre>
{`# fluentd.conf
<source>
  @type tail
  path /var/log/containers/*.log
  pos_file /var/log/td-agent/containers.log.pos
  tag kubernetes.*
  read_from_head true
  <parse>
    @type json
    time_format %Y-%m-%dT%H:%M:%S.%NZ
  </parse>
</source>

# Another common source for Kubernetes is systemd/journald
<source>
  @type systemd
  @id input_systemd
  tag journald.kubernetes
  <entry>
    field_map {"MESSAGE":"log"}
    field_map_json {"MESSAGE":"json_log"}
  </entry>
  <filter>
    @type stdout
  </filter>
</source>`}
          </pre>
        </div>
      </div>
    </div>
  );
};

export default KubernetesSourceExample;