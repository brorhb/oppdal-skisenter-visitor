export default function get_publish_date(time) {
    if(time.includes("T")) {
        if ((time.split("T")[0]).length > 0) {
            let published_time = time.split("T")[1].split(":")
            let published_date = time.split("T")[0].split("-")
    
            const today = new Date();
            const current_year = today.getFullYear();
            let current_month = today.getMonth() + 1;
            let current_day = today.getDate();
    
            if (current_year == published_date[0] && current_month == published_date[1] && current_day == published_date[2]) {
                return "I dag - kl. " + published_time[0] + ":" + published_time[1];
            } else if (current_year == published_date[0] && current_month == published_date[1] && current_day-1 == published_date[2]) {
                return "I går - kl. " + published_time[0] + ":" + published_time[1];
            } else {
                return published_date[2] + "." + published_date[1] + "." + published_date[0] + " - kl. " + published_time[0] + ":" + published_time[1];
            };
        } else {
            return "Dato ikke gitt";
        }
    } else {
        return "Dato ikke gitt";
    }
}