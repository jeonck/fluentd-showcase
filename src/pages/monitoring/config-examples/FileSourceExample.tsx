const FileSourceExample = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-gray-900 mb-6">파일 소스 예제</h1>
      <div className="space-y-6 text-lg text-gray-700">
        <p>
          Fluentd에서 파일 소스를 설정하는 예제입니다. 주로 애플리케이션 로그 파일이나 시스템 로그 파일을 모니터링할 때 사용됩니다.
        </p>
        <div className="bg-gray-800 p-6 rounded-lg text-white font-mono text-sm overflow-x-auto mt-4">
          <pre>
{`# fluentd.conf
<source>
  @type tail
  path /var/log/my-app/access.log
  pos_file /var/log/td-agent/my-app-access.log.pos
  tag myapp.access
  <parse>
    @type apache2 # Example: use apache2 parser for common log format
  </parse>
</source>

<source>
  @type tail
  path /var/log/systemd.log
  pos_file /var/log/td-agent/systemd.log.pos
  tag systemd.logs
  <parse>
    @type none # No specific parsing, treat as plain text
  </parse>
</source>`}
          </pre>
        </div>
      </div>
    </div>
  );
};

export default FileSourceExample;