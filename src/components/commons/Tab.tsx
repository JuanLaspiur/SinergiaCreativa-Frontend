import { useState } from 'react';

interface TabItem {
  title: string;
  component: React.ReactNode;
}

interface TabProps {
  tabs: TabItem[];
}

const Tab = ({ tabs }: TabProps) => {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div className="row mt-4">
      <ul className="nav nav-tabs" id="myTab" role="tablist">
        {tabs.map((tab, index) => (
          <li className="nav-item" role="presentation" key={index}>
            <a
              className={`nav-link ${activeTab === index ? 'active' : ''}`}
              id={`${tab.title}-tab`}
              data-bs-toggle="tab"
              href={`#${tab.title}`}
              role="tab"
              onClick={() => setActiveTab(index)}
            >
              {tab.title}
            </a>
          </li>
        ))}
      </ul>

      <div className="tab-content mt-3">
        {tabs.map((tab, index) => (
          <div
            className={`tab-pane fade ${activeTab === index ? 'show active' : ''}`}
            id={tab.title}
            role="tabpanel"
            key={index}
          >
            {tab.component}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Tab;
