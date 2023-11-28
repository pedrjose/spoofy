export function PlaylistCard({ props }) {
  return (
    <>
      <h1>{props.playlistName}</h1>
      <p>{props.playlistId}</p>
    </>
  );
}
