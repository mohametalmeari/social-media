import { Line } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";

const Chart = ({ interactions }) => {
  const weekday = (index) => {
    if (index === 0) return "Today";
    if (index === 1) return "Yesterday";
    const weekdays = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    let day_index = new Date().getDay() - index;
    if (day_index < 0) {
      day_index += 7;
    }
    return weekdays[day_index];
  };

  const data = {
    labels: interactions[0].stats.map((_, i) => weekday(i)).reverse(),
    datasets: interactions.map((interaction) => ({
      label: interaction.name,
      data: interaction.stats.map((val) => val).reverse(),
      borderColor: interaction.color,
      borderWidth: 1,
    })),
  };

  return <Line data={data} options={{}} />;
};

export default Chart;
