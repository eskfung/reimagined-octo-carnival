interface PlaceSummaryProps {
  /** @todo a real type */
  placeDetail: any;
}
export const PlaceSummary = ({ placeDetail }: PlaceSummaryProps) => {
  return (
    <div>
      <h3>{placeDetail.displayName.text}</h3>
      <p>{placeDetail.formattedAddress}</p>
    </div>
  );
};
