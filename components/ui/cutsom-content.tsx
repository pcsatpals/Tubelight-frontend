const CustomToastContent = ({ title, description }: { title: string, description: string }) => (
    <div>
        <h5 style={{ fontWeight: 'bold', margin: '0 0 0.5rem 0' }}>{title}</h5>
        <p style={{ margin: 0 }}>{description}</p>
    </div>
);

export default CustomToastContent;