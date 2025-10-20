const NetworkingSecurityMonitoring = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-gray-900 mb-6">네트워킹 및 보안 모니터링</h1>
      <div className="space-y-6 text-lg text-gray-700">
        <p>
          Calico/Flannel 네트워크 로그를 Fluentd로 수집합니다. OpenSearch로 네트워크 정책 위반(예: Pod 간 unauthorized access)을 감지할 수 있습니다. (예: NetworkPolicy 적용 후 보안 감사)
        </p>
        <p>
          Audit 로그(예: kube-audit)를 Fluentd로 파싱해 OpenSearch에 저장합니다. 권한 상승(Privilege Escalation) 시도 실시간 탐지와 알림(Slack 연동)을 설정할 수 있습니다.
        </p>
      </div>
    </div>
  );
};

export default NetworkingSecurityMonitoring;