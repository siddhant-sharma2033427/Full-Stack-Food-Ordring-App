const Page = (props) => {
    const name = decodeURI(props.params.name)
    return (

        <div>
            <div className="restaurant-page-banner">
                <h1>{name}</h1>
            </div>
        </div>
    )
}
export default Page