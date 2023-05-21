import WorkList from '../containers/worksList/work_list';

export default function FeedPage() {
  return (
    <div>
      <WorkList />
      <div style={{ minHeight: '95vh', minWidth: '50vh' }}>
        <div style={{ paddingTop: '90vh' }}>全て閲覧しました！</div>
      </div>
    </div>
  );
}
