import { format } from 'date-fns/format';

type LatestLoginDateProps = {
  latestLoginDate: Date;
};

export default function LatestLoginDate({
  latestLoginDate,
}: LatestLoginDateProps) {
  const date = latestLoginDate
    ? format(new Date(latestLoginDate), 'MMM dd, yyyy')
    : '';
  return <div>Latest user login: {date}</div>;
}
