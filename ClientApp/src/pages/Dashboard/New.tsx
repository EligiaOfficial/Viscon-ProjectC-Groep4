import {useState, useEffect} from "react";
import {axiosInstance} from "../../axiosInstance"

function New() {
    const [ticketArray, setTicketArray] = useState([]);
    
    useEffect(() => {
        axiosInstance.get('/api/ticket/newtickets').then(response => {
            console.log(response);
        })
    });
}

export default New;
