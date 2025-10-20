import { useParams, Link } from 'react-router-dom';
import { ArrowLeft } from 'react-feather';

const PromptDetail = () => {
  const { id } = useParams();

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <Link 
          to="/" 
          className="inline-flex items-center text-gray-600 hover:text-indigo-600 transition-colors"
        >
          <ArrowLeft size={20} className="mr-2" />
          Back to Home
        </Link>
      </div>

      <div className="bg-white rounded-2xl shadow-lg border border-gray-200/80 overflow-hidden">
        <div className="p-8 md:p-12">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Prompt Details</h1>
          <p className="text-lg text-gray-600 mb-8">Showing details for prompt: <span className="font-semibold text-indigo-600">{id}</span></p>
          
          <div className="prose prose-lg max-w-none text-gray-700">
            <p>This is where the detailed content for the prompt would be displayed. It could include:</p>
            <ul>
              <li>The full prompt text.</li>
              <li>Examples of inputs and outputs.</li>
              <li>Analysis of the prompt's effectiveness.</li>
              <li>Variations and alternative phrasings.</li>
            </ul>
            <p>For now, this is a placeholder to demonstrate the page structure.</p>
          </div>
        </div>
        <div className="bg-gray-50/80 px-8 py-6 border-t border-gray-200/80">
            <p className="text-sm text-gray-600">This is a placeholder page. In a real application, this content would be dynamically loaded based on the prompt ID.</p>
        </div>
      </div>
    </div>
  );
};

export default PromptDetail;
