import React from "react";
import { Chart as ChartJS } from "chart.js/auto";
import { Line } from "react-chartjs-2";
import { Col, Row, Typography } from "antd";

const { Title } = Typography;

const LineChart = ({ coinHistory, currentPrice, coinName }) => {
  const coinPrice = [];
  const coinTimestamp = [];

  for (let i = 0; i < coinHistory?.data?.history?.length; i += 1) {
    coinPrice.push(coinHistory?.data?.history[i].price);
    coinTimestamp.push(
      new Date(
        coinHistory?.data?.history[i]?.timestamp * 1000
      ).toLocaleDateString()
    );
  }

  const data = {
    labels: coinTimestamp.reverse(),
    datasets: [
      {
        label: `Price of ${coinName} In USD`,
        data: coinPrice.reverse(),
        fill: false,
        backgroundColor: "#0071bd",
        borderColor: "#0071bd",
        borderWidth: 2,
        tension: 0.4,
      },
    ],
  };

  const options = {
    elements: {
      point: {
        radius: 0,
        pointStyle: "circle",
        pointHoverBackgroundColor: "#FF7A7A",
        pointHoverBorderColor: "#000000",
      },
    },
    scales: {
      y: {
        ticks: {
          beginAtZero: true,
        },
        type: "linear",
      },
    },
  };

  return (
    <>
      <Row className="chart-header">
        <Title level={2} className="chart-title">
          {coinName} Price Chart{" "}
        </Title>
        <Col className="price-container">
          <Title level={5} className="price-change">
            Change: {coinHistory?.data?.change}%
          </Title>
          <Title level={5} className="current-price">
            Current {coinName} Price: $ {currentPrice}
          </Title>
        </Col>
      </Row>
      <Line data={data} options={options} />
    </>
  );
};

export default LineChart;
