import GaugeChart from 'react-gauge-chart'

const GaugeChartComponent = (props) => {
    const { service_status, tier_details } = props;
    return (
        <GaugeChart
            id="gauge-chart1"
            nrOfLevels={15}
            colors={["green", "green", "#FFC371", "red"]}
            arcWidth={0.3}
            percent={tier_details.transactions_current / (tier_details.transactions_maximum+tier_details.transactions_maximum*0.2)}
            hideText={false}
            width={200}
            cornerRadius={10}
            textColor={service_status.over_quota ? service_status.suspended ? "red" : "#d98f17" : "green"}
        />
    )
}

export default GaugeChartComponent;
