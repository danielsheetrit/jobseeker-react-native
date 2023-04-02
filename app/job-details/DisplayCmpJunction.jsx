import React from 'react';
import { JobAbout, Specifics } from '../../components';

export default function DisplayCmpJunction({ activeTab, tabs, data }) {
  if (activeTab === tabs[0]) {
    return <JobAbout info={data.job_description || 'No Job Description Mentioned'} />;
  }

  if (activeTab === tabs[1]) {
    return (
      <Specifics
        title="Qualifications"
        points={data.job_highlights?.Qualifications || ['No Qualifications Mentioned']}
      />
    );
  }

  return (
    <Specifics
      title="Qualifications"
      points={data.job_highlights?.Responsibilities || ['No Responsibilities Mentioned']}
    />
  );
}
