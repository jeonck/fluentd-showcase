const OutputExamples = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-gray-900 mb-6">출력 예제</h1>
      <div className="space-y-6 text-lg text-gray-700">
        <p>
          Fluentd 출력 플러그인은 처리된 로그 데이터를 최종 목적지로 전송합니다. 다음은 OpenSearch 및 다른 일반적인 출력 대상에 대한 예제입니다.
        </p>
        <h2 className="text-3xl font-semibold text-gray-800 mb-4 mt-6">OpenSearch 출력</h2>
        <p>
          Fluentd에서 OpenSearch로 로그를 전송하는 가장 일반적인 설정입니다.
        </p>
        <div className="bg-gray-800 p-6 rounded-lg text-white font-mono text-sm overflow-x-auto mt-4">
          <pre>
{`# fluentd.conf
<match kubernetes.**>
  @type opensearch
  host opensearch-master.opensearch.svc.cluster.local
  port 9200
  scheme http
  user fluentd
  password changeme
  ssl_verify_mode false
  logstash_format true
  logstash_prefix kubernetes-logs
  <buffer>
    @type file
    path /var/log/td-agent/buffer/opensearch
    flush_interval 5s
  </buffer>
</match>`}
          </pre>
        </div>

        <h2 className="text-3xl font-semibold text-gray-800 mb-4 mt-6">Stdout (콘솔) 출력</h2>
        <p>
          디버깅 목적으로 Fluentd가 처리하는 로그를 콘솔에 출력합니다.
        </p>
        <div className="bg-gray-800 p-6 rounded-lg text-white font-mono text-sm overflow-x-auto mt-4">
          <pre>
{`# fluentd.conf
<match **>
  @type stdout
</match>`}
          </pre>
        </div>

        <h2 className="text-3xl font-semibold text-gray-800 mb-4 mt-6">S3 출력</h2>
        <p>
          로그 데이터를 Amazon S3 버킷에 저장합니다. 장기 보관 및 아카이빙에 유용합니다.
        </p>
        <div className="bg-gray-800 p-6 rounded-lg text-white font-mono text-sm overflow-x-auto mt-4">
          <pre>
{`# fluentd.conf
<match myapp.**>
  @type s3
  aws_key_id YOUR_AWS_ACCESS_KEY_ID
  aws_sec_key YOUR_AWS_SECRET_ACCESS_KEY
  s3_bucket YOUR_S3_BUCKET_NAME
  s3_region YOUR_AWS_REGION
  path logs/myapp/
  time_slice_format %Y%m%d%H
  <buffer time,tag>
    @type file
    path /var/log/td-agent/buffer/s3
    timekey 3600 # 1 hour
    timekey_wait 10m
    chunk_limit_size 256m
  </buffer>
</match>`}
          </pre>
        </div>
      </div>
    </div>
  );
};

export default OutputExamples;