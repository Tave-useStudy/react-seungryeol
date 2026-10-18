function Column({ children }) {
  return (
    <div>
      {children}
    </div>
  );
}

function ColumnTitle({ children }) {
  return <h2>{children}</h2>;
}

function ColumnContent({ children }) {
  return <div>{children}</div>;
}

Column.Title = ColumnTitle;
Column.Content = ColumnContent;

export default Column;