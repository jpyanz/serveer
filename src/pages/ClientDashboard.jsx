import Footer from "../components/Footer";
import Header from "../components/Header";

const ClientDashboard = () => {
    return (
        <>
            <Header />

            <h1 className="mx-auto min-h-[60vh] w-full max-w-[1200px] px-6 py-16 text-4xl font-extrabold tracking-tight text-green-950 sm:text-5xl">Client Dashboard</h1>

            <Footer />
        </>
    );
};

export default ClientDashboard;
