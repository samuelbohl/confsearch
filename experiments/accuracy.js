import { parse as csvParse } from 'csv-parse';
import { parse, isWithinInterval } from 'date-fns';
import { createReadStream } from 'fs';

function parseCSV(filePath) {
  return new Promise((resolve, reject) => {
    const results = [];
    createReadStream(filePath)
      .pipe(csvParse({ columns: true }))
      .on('data', (data) => results.push(data))
      .on('end', () => resolve(results))
      .on('error', (error) => reject(error));
  });
}

function parseDate(dateString) {
  if (!dateString || dateString === 'N/A') return null;
  const [monthDay, year] = dateString.split(', ');
  const [month, day] = monthDay.split(' ');
  return parse(`${year}-${month}-${day.padStart(2, '0')}`, 'yyyy-MMM-dd', new Date());
}


async function main() {
  try {
    const file1Data = await parseCSV('old_events.csv');
    const file2Data = await parseCSV('new_events.csv');

    // rows with matching URLs
    const matchingRows = file1Data.filter(row1 => {
      return file2Data.find(row2 => row1.event_url === row2.wikicfp_url);
    });

    // Filter and compare
    const filteredResults = matchingRows.filter(row1 => {
      const matchingRow = file2Data.find(row2 => row1.event_url === row2.wikicfp_url);
      if (!matchingRow) return false;

      const [startDate, endDate] = row1.when.split(' - ').map(parseDate);
      if (!startDate || !endDate) return false;

      const file2StartDate = parse(matchingRow.start, 'yyyy-MM-dd', new Date());
      const file2EndDate = parse(matchingRow.end, 'yyyy-MM-dd', new Date());

      return isWithinInterval(startDate, { start: file2StartDate, end: file2EndDate }) &&
        isWithinInterval(endDate, { start: file2StartDate, end: file2EndDate });
    });

    const percentage = filteredResults.length / matchingRows.length * 100;
    console.log(`Percentage of matching rows: ${percentage.toFixed(2)}%`);
  } catch (error) {
    console.error('Error:', error);
  }
}

main();