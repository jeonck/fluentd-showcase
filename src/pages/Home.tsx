import { Link } from 'react-router-dom';
import { ArrowRight, Server, HardDrive, GitPullRequest, Shield, TrendingUp } from 'react-feather'; // Updated icons

const Home = () => {
  const categories = [
    {
      title: '클러스터 및 노드 모니터링',
      description: '노드 리소스 및 헬스 체크, etcd 및 컨트롤 플레인 모니터링.',
      icon: <Server size={20} />,
      link: '/monitoring/cluster-node'
    },
    {
      title: 'Pod 및 워크로드 모니터링',
      description: 'Pod 로그 중앙화 및 디버깅, 마이크로서비스 성능 추적.',
      icon: <GitPullRequest size={20} />,
      link: '/monitoring/pod-workload'
    },
    {
      title: '네트워킹 및 보안 모니터링',
      description: '서비스 디스커버리 및 트래픽 분석, RBAC 및 보안 이벤트 모니터링.',
      icon: <Shield size={20} />,
      link: '/monitoring/networking-security'
    },
    {
      title: '스토리지 및 데이터 관리 모니터링',
      description: 'PVC 및 볼륨 이벤트 추적, 백업/복구 프로세스 모니터링.',
      icon: <HardDrive size={20} />,
      link: '/monitoring/storage-data'
    },
    {
      title: '비즈니스 워크로드 및 확장성 모니터링',
      description: 'HPA/Auto-scaling 이벤트 분석, 멀티테넌시 환경 모니터링.',
      icon: <TrendingUp size={20} />,
      link: '/monitoring/business-scalability'
    },
  ];

  return (
    <div className="space-y-16 md:space-y-24">
      {/* Hero Section - Updated for Fluentd-OpenSearch */}
      <div className="text-center pt-20 md:pt-28">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-gray-900 tracking-tight">
          <span className="block">Kubernetes(K8s) 기반</span>
          <span className="block text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-purple-500 mt-2">
            Fluentd-OpenSearch 모니터링 Use Case
          </span>
        </h1>
        <p className="mt-6 max-w-3xl mx-auto text-lg sm:text-xl text-gray-600">
          Kubernetes 환경에서 Fluentd는 로그 수집의 핵심으로, DaemonSet이나 Sidecar 패턴으로 배포되어 Pod/노드 로그를 중앙화합니다. OpenSearch(Elasticsearch 호환)와 결합하면 EFK(OpenSearch) 스택으로 실시간 모니터링이 가능하며, OpenSearch Dashboards(Kibana 대체)로 시각화하고 알림을 설정할 수 있어요. 아래는 K8s 특화된 use case를 카테고리별로 재정리했습니다. 각 use case는 K8s 네이티브 도구(Prometheus, Metrics Server 등)와 연동을 가정합니다.
        </p>
      </div>

      {/* Featured Content Section */}
      <div id="features" className="text-center">
        <h2 className="text-3xl font-bold text-gray-900">카테고리별 Use Case</h2>
        <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-600">Fluentd-OpenSearch를 활용한 K8s 모니터링 시나리오를 살펴보세요.</p>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {categories.map((category) => (
          <Card key={category.title} {...category} />
        ))}
      </div>

      {/* Implementation Tips Section */}
      <div className="bg-gray-100/70 rounded-3xl p-8 md:p-12 lg:p-16 border border-gray-200/80">
        <h3 className="text-2xl font-bold text-gray-900 mb-6">구현 팁 (K8s 중심)</h3>
        <ul className="space-y-4 text-lg text-gray-700">
          <li><strong>배포 예시:</strong> Fluentd를 DaemonSet으로 설치(예: fluent/fluentd-kubernetes-daemonset Helm 차트). conf 파일에서 &lt;source&gt;로 kubelet/journald, &lt;match kubernetes.**&gt;로 OpenSearch 출력 설정. (인덱스: logstash-k8s-&#123;+YYYY.MM.dd&#125;)</li>
          <li><strong>연동 도구:</strong> OpenSearch Operator로 클러스터 내 OpenSearch 배포. Prometheus와 결합해 로그-메트릭 상관 분석.</li>
          <li><strong>스케일링:</strong> 대규모 클러스터(1000+ 노드) 시 Fluentd의 버퍼 플러그인과 OpenSearch의 ILM(Index Lifecycle Management) 사용.</li>
          <li><strong>베스트 프랙티스:</strong> RBAC로 Fluentd 접근 제한, 로그 로테이션으로 스토리지 비용 절감.</li>
        </ul>
      </div>
    </div>
  );
};

interface CardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  link: string;
}

const Card = ({ title, description, icon, link }: CardProps) => (
  <Link to={link} className="block group">
    <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-200/80 h-full flex flex-col p-8">
      <div className="flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 text-white mb-6">
        {icon}
      </div>
      <div className="flex-grow">
        <h3 className="text-xl font-bold text-gray-900">{title}</h3>
        <p className="mt-3 text-gray-600">{description}</p>
      </div>
      <div className="mt-6 flex items-center justify-between text-indigo-600 font-medium">
        <span>자세히 보기</span>
        <ArrowRight className="group-hover:translate-x-1 transition-transform" size={20} />
      </div>
    </div>
  </Link>
);

// Principle component is no longer needed, but keeping it for now in case it's used elsewhere or for future expansion.

export default Home;