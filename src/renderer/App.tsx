import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { Layout } from '../components/layout';
import { Map } from '../components/pages/home';
import { TestingGovsSection } from '../components/pages/AddTests';
import { AllTestingSection } from '../components/pages/TestingList';
import { NewGov } from '../components/pages/AddGov';
import { DataAnalysis } from '../components/pages/DataAnalysis';

export default function App() {
  return (
    <MemoryRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Map />} />
          <Route path="all-testing" element={<AllTestingSection />} />
          <Route path="add-gov" element={<NewGov />} />
          <Route path="add-test" element={<TestingGovsSection />} />
          <Route path="data-analysis" element={<DataAnalysis />} />
        </Route>
      </Routes>
    </MemoryRouter>
  );
}
