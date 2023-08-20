import {
    PageContent,
    PageFooter,
    PageHeader,
    pageMargin,
    pageSize,
    ReportRoot,
    ReportView,
    Section,
    SectionFooter,
    SectionHeader,
  } from "@jikji/react";
  
  function Report() {

    
    return (
      <ReportRoot>
        <ReportView>
          <Section dimension={pageSize.A4} margin={pageMargin.Narrow}>
            <SectionHeader>Section Header</SectionHeader>
            <SectionFooter>Section Footer</SectionFooter>
            <PageHeader>Page Header</PageHeader>
            <PageContent> Report Content </PageContent>
            <PageFooter>Page Footer</PageFooter>
          </Section>
        </ReportView>
      </ReportRoot>
    );
  }
  
  export default Report;