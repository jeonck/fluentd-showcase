const StorageDataMonitoring = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-gray-900 mb-6">스토리지 및 데이터 관리 모니터링</h1>
      <div className="space-y-6 text-lg text-gray-700">
        <p>
          CSI 드라이버 로그를 Fluentd로 중앙화합니다. OpenSearch로 스토리지 할당 실패나 볼륨 마운트 오류를 분석할 수 있습니다. (예: EBS/GPD 스토리지 풀 과부하 예측)
        </p>
        <p>
          Velero나 Kasten 같은 백업 도구 로그를 수집합니다. OpenSearch 대시보드로 백업 성공률(99% 이상) 모니터링과 실패 원인 루트코즈 분석을 할 수 있습니다.
        </p>
      </div>
    </div>
  );
};

export default StorageDataMonitoring;