const ClusterNodeMonitoring = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-gray-900 mb-6">클러스터 및 노드 모니터링</h1>
      <div className="space-y-6 text-lg text-gray-700">
        <p>
          Fluentd를 노드 레벨 DaemonSet으로 배포해 kubelet, etcd, API 서버 로그를 수집합니다. OpenSearch에 저장 후, CPU/메모리 과부하(예: OOMKilled 이벤트)나 노드 다운 시 실시간 알림을 받을 수 있습니다. (예: GKE/AKS 클러스터에서 노드 스케일링 트리거)
        </p>
        <p>
          etcd 로그를 Fluentd로 필터링해 OpenSearch로 전송합니다. 클러스터 안정성 지표(예: etcd 지연 시간) 분석으로 고가용성을 유지할 수 있습니다.
        </p>
      </div>
    </div>
  );
};

export default ClusterNodeMonitoring;