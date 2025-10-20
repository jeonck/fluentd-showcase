const FilterExamples = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-gray-900 mb-6">필터 예제</h1>
      <div className="space-y-6 text-lg text-gray-700">
        <p>
          Fluentd 필터는 수집된 로그 데이터를 파싱, 변환, 보강하는 데 사용됩니다. 다음은 몇 가지 일반적인 필터 예제입니다.
        </p>
        <h2 className="text-3xl font-semibold text-gray-800 mb-4 mt-6">Kubernetes 메타데이터 필터</h2>
        <p>
          로그에 Kubernetes Pod, Namespace, Container 정보 등을 추가하여 로그를 풍부하게 만듭니다.
        </p>
        <div className="bg-gray-800 p-6 rounded-lg text-white font-mono text-sm overflow-x-auto mt-4">
          <pre>
{`# fluentd.conf
<filter kubernetes.**>
  @type kubernetes_metadata
  @id filter_kube_metadata
</filter>`}
          </pre>
        </div>

        <h2 className="text-3xl font-semibold text-gray-800 mb-4 mt-6">Parser 필터</h2>
        <p>
          특정 필드의 값을 파싱하여 구조화된 데이터로 만듭니다. 예를 들어, JSON 형식의 로그 문자열을 파싱할 수 있습니다.
        </p>
        <div className="bg-gray-800 p-6 rounded-lg text-white font-mono text-sm overflow-x-auto mt-4">
          <pre>
{`# fluentd.conf
<filter myapp.access>
  @type parser
  key_name log # The field containing the log string to parse
  <parse>
    @type json # Parse as JSON
  </parse>
</filter>`}
          </pre>
        </div>

        <h2 className="text-3xl font-semibold text-gray-800 mb-4 mt-6">Grep 필터</h2>
        <p>
          특정 패턴과 일치하는 로그만 통과시키거나 제외할 때 사용됩니다.
        </p>
        <div className="bg-gray-800 p-6 rounded-lg text-white font-mono text-sm overflow-x-auto mt-4">
          <pre>
{`# fluentd.conf
<filter myapp.access>
  @type grep
  <regexp>
    key message
    pattern /error|fail/ # Only pass logs containing 'error' or 'fail' in the 'message' field
  </regexp>
</filter>`}
          </pre>
        </div>
      </div>
    </div>
  );
};

export default FilterExamples;