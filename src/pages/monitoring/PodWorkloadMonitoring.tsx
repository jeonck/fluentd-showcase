const PodWorkloadMonitoring = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-gray-900 mb-6">Pod 및 워크로드 모니터링</h1>
      <div className="space-y-6 text-lg text-gray-700">
        <p>
          Fluentd의 multiline parser로 애플리케이션 로그(예: JSON 형식)를 수집합니다. OpenSearch 쿼리로 Pod 재시작이나 CrashLoopBackOff 패턴을 탐지할 수 있습니다. (예: Deployment 롤아웃 중 오류 추적)
        </p>
        <p>
          각 Pod의 메트릭(예: Istio/Envoy 프록시 로그)을 Fluentd로 모아 OpenSearch에 인덱싱합니다. 서비스 지연(latency)과 에러율 대시보드를 생성할 수 있습니다. (예: Helm 차트 기반 배포 모니터링)
        </p>
      </div>
    </div>
  );
};

export default PodWorkloadMonitoring;