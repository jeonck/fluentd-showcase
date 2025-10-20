import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import ClusterNodeMonitoring from './pages/monitoring/ClusterNodeMonitoring';
import PodWorkloadMonitoring from './pages/monitoring/PodWorkloadMonitoring';
import NetworkingSecurityMonitoring from './pages/monitoring/NetworkingSecurityMonitoring';
import StorageDataMonitoring from './pages/monitoring/StorageDataMonitoring';
import BusinessScalabilityMonitoring from './pages/monitoring/BusinessScalabilityMonitoring';
import FluentdOpenSearchOverview from './pages/monitoring/FluentdOpenSearchOverview'; // New import
import FileSourceExample from './pages/monitoring/config-examples/FileSourceExample'; // New import
import KubernetesSourceExample from './pages/monitoring/config-examples/KubernetesSourceExample'; // New import
import FilterExamples from './pages/monitoring/config-examples/FilterExamples'; // New import
import OutputExamples from './pages/monitoring/config-examples/OutputExamples'; // New import
import K8sContainerLogFlow from './pages/monitoring/K8sContainerLogFlow'; // New import


function App() {
  return (
    <Router basename="/fluentd-showcase/">
      <div className="min-h-screen bg-gray-50 font-sans antialiased">
        <div className="absolute inset-0 bg-gradient-to-b from-indigo-100 to-gray-50 h-[500px]" aria-hidden="true"></div>
        <div className="relative">
          <Navbar />
          <main className="container mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-16 max-w-7xl relative">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/monitoring/fluentd-opensearch-overview" element={<FluentdOpenSearchOverview />} />
              <Route path="/monitoring/k8s-container-log-flow" element={<K8sContainerLogFlow />} /> {/* New Route */}
              <Route path="/monitoring/cluster-node" element={<ClusterNodeMonitoring />} />
              <Route path="/monitoring/pod-workload" element={<PodWorkloadMonitoring />} />
              <Route path="/monitoring/networking-security" element={<NetworkingSecurityMonitoring />} />
              <Route path="/monitoring/storage-data" element={<StorageDataMonitoring />} />
              <Route path="/monitoring/business-scalability" element={<BusinessScalabilityMonitoring />} />
              {/* New Routes for config examples */}
              <Route path="/monitoring/config-examples/file-source" element={<FileSourceExample />} />
              <Route path="/monitoring/config-examples/kubernetes-source" element={<KubernetesSourceExample />} />
              <Route path="/monitoring/config-examples/filter-examples" element={<FilterExamples />} />
              <Route path="/monitoring/config-examples/output-examples" element={<OutputExamples />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

const Footer = () => (
  <footer className="bg-white border-t border-gray-200/80">
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-col md:flex-row justify-between items-center">
        <div className="text-center md:text-left mb-4 md:mb-0">
          <p className="text-lg font-semibold text-gray-800">Fluentd Showcase</p>
          <p className="text-sm text-gray-600">A Showcase of Fluentd Log Management</p>
        </div>
        <div className="text-sm text-gray-600">
          <p>&copy; {new Date().getFullYear()} DigitalTwin Hub. All rights reserved.</p>
        </div>
      </div>
    </div>
  </footer>
);

export default App;