const PageNotFound = () => {
    console.log("Rendering 404 Page");
    return (
        <div  style={{ display: 'flex', flexDirection: 'column',justifyContent:'center', alignItems: 'center',width:'100%', color: 'var(--primary-color)', textAlign: 'center', marginTop: '50px' }}>
            <h2>404 Error</h2>
            <p>Oops! The page you're looking for does not exist.</p>
        </div>
    );
};

export default PageNotFound;