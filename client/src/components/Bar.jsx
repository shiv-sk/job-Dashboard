import {Bar} from "react-chartjs-2";
import {Chart as ChartJS, CategoryScale, LinearScale, BarElement, Tooltip, Legend, Title} from "chart.js";

export default function BarChart({data}){
    ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend, Title);
    return(
        <Bar data={data}/>
    )
}