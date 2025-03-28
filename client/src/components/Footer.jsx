export default function Footer(){
    return(
        <footer className="footer sm:footer-horizontal footer-center bg-base-300 text-base-content p-4">
            <aside>
                <p className="text-lg font-semibold">
                    Copyright © {new Date().getFullYear()} - All right reserved by Job-DashBoard System Pvt. Ltd</p>
            </aside>
        </footer>
    )
}