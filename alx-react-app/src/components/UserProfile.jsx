const UserProfile = (props) => {
const { Name, Age, Bio } = props;

  return (
    <div>
      <h2>{Name}</h2>
      <p>{Age}</p>
      <p>{Bio}</p>
    </div>
  )
}

export default UserProfile
