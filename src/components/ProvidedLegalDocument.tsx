import { Fragment, type ReactNode } from 'react';

function renderBlocks(text: string): ReactNode[] {
  return text.trim()
    .replace(/\n(?=\d+\.\d+\.\s)/g, '\n\n')
    .replace(/\n(?=(?:[1-9]|1[0-2])\.\s+[А-ЯЁ])/g, '\n\n')
    .split(/\n\s*\n/).map((block, index) => {
    const [firstLine, ...rest] = block.trim().split('\n');
    const heading = /^(?:[1-9]|1[0-2])\.\s+\S/.test(firstLine) || firstLine === 'Основные термины и определения';

    return heading
      ? <Fragment key={index}>
          <h2>{firstLine}</h2>
          {rest.length > 0 && <p className="legal-document__paragraph">{rest.join('\n').trim()}</p>}
        </Fragment>
      : <p className="legal-document__paragraph" key={index}>{block.trim()}</p>;
    });
}

function PrivacyCategories({ text }: { text: string }) {
  const rows = text.trim().split(/(?=^[1-5]\t)/m).slice(1);

  return (
    <div className="legal-document__categories">
      {rows.map((row) => {
        const cells = row.trim().split('\t');
        const number = cells[0];
        const title = cells[1]?.trim();
        const categories = cells.slice(2, -1).join('\n').trim().replace(/;(?=–)/g, ';\n');
        const actions = cells.at(-1)?.trim();

        return (
          <section className="legal-document__category" key={number} aria-labelledby={`privacy-purpose-${number}`}>
            <h3 id={`privacy-purpose-${number}`}>{number}. {title}</h3>
            <h4>Категории данных</h4>
            <p className="legal-document__paragraph">{categories}</p>
            <h4>Действия с данными</h4>
            <p className="legal-document__paragraph">{actions}</p>
          </section>
        );
      })}
    </div>
  );
}

export function ProvidedLegalDocument({ text, startAt, endBefore, privacyTable = false }: {
  text: string;
  startAt: string;
  endBefore?: string;
  privacyTable?: boolean;
}) {
  const normalized = text.replace(/\r\n?/g, '\n');
  const start = normalized.indexOf(startAt);
  const afterStart = start >= 0 ? normalized.slice(start) : normalized;
  const end = endBefore ? afterStart.indexOf(endBefore) : -1;
  const document = (end >= 0 ? afterStart.slice(0, end) : afterStart).trim();

  if (!privacyTable) return <div className="legal-document">{renderBlocks(document)}</div>;

  const tableStart = document.indexOf('№ п/п\t');
  const tableEnd = document.indexOf('Персональные данные, которые собирает и хранит Оператор');
  if (tableStart < 0 || tableEnd < tableStart) {
    return <div className="legal-document">{renderBlocks(document)}</div>;
  }

  return (
    <div className="legal-document">
      {renderBlocks(document.slice(0, tableStart))}
      <PrivacyCategories text={document.slice(tableStart, tableEnd)} />
      {renderBlocks(document.slice(tableEnd))}
    </div>
  );
}
