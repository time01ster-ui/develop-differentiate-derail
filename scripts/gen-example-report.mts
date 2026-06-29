// Generate the EXAMPLE lab report as standalone HTML for the portal embed (the
// student + teacher PDF). It renders the SAME buildExampleReport() the in-sim
// exemplar uses, so the example a student reviews up front and the PDF on the
// portal are identical. Run:
//   node --import tsx scripts/gen-example-report.mts > /tmp/example-lab-report.html
// then print to PDF with headless Chrome.

import { buildExampleReport, EXAMPLE_DATE, EXAMPLE_NAME, reportToHtml } from '../src/lib/report.ts'

process.stdout.write(reportToHtml(buildExampleReport(), EXAMPLE_NAME, EXAMPLE_DATE))
