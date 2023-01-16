import React, { useEffect, useState } from "react";
import millify from "millify";
import { Collapse, Row, Col, Typography, Avatar } from "antd";
import HTMLReactParser from "html-react-parser";

import { useGetCryptoExchangesQuery } from "../services/cryptoExchangesApi";

import Loader from "./Loader";

const { Text } = Typography;
const { Panel } = Collapse;

const Exchanges = () => {
  const { data, isFetchingData } = useGetCryptoExchangesQuery();
  console.log(data);

  const exchangesData = data?.filter(
    (exchange) =>
      exchange?.trust_score_rank > 1 && exchange?.trust_score_rank < 22
  );

  if (isFetchingData) return <Loader />;

  return (
    <>
      <Row>
        <Col span={7}>Exchanges</Col>
        <Col span={8}>24h Trade Volume</Col>
        <Col span={6}>Year Established</Col>
      </Row>
      <Row>
        {exchangesData?.map((exchange) => (
          <Col key={exchange.id} span={24}>
            <Collapse>
              <Panel
                key={exchange.id}
                showArrow={false}
                header={
                  <Row key={exchange.id}>
                    <Col span={8}>
                      <Text>
                        <strong>{exchange.trust_score_rank - 1}.</strong>
                      </Text>
                      <a href={exchange.url} target="_blank" rel="noreferrer">
                        <Avatar
                          className="exchange-image"
                          src={exchange.image}
                        />
                        <Text>
                          <strong>{exchange.name}</strong>
                        </Text>
                      </a>
                    </Col>
                    <Col span={8}>
                      ${millify(exchange.trade_volume_24h_btc)}
                    </Col>
                    <Col span={8}>{exchange.year_established}</Col>
                  </Row>
                }
              >
                <Col span={6}>
                  <strong>{`Country: ${exchange.country}`}</strong>
                </Col>
                <Col span={18}>
                  <Row>
                    {exchange.description ||
                      `DEMO DESCRIPTION!!! Introducing "CryptoHaven," the premier cryptocurrency exchange platform for buying and selling digital assets. Founded in 2019 by a group of blockchain enthusiasts, CryptoHaven has quickly risen to become one of the most trusted and user-friendly exchanges in the industry.

With a focus on security and ease of use, CryptoHaven offers a wide range of features to help users manage their digital assets. From advanced trading tools and charts, to multiple payment options and 24/7 customer support, CryptoHaven has everything you need to navigate the exciting world of cryptocurrency.

One of the unique aspects of CryptoHaven is its strong emphasis on community. The platform hosts regular meetups and events, where users can connect with like-minded individuals and learn more about the latest developments in the crypto space. Additionally, CryptoHaven's team of experienced traders and developers are always available to offer guidance and support to new users.

But that's not all, CryptoHaven also offers a wide range of educational resources for users who are new to the crypto space. From basic guides and tutorials, to in-depth market analysis and trading strategies, CryptoHaven has something for everyone.

                    Overall, CryptoHaven is a one-stop-shop for all your cryptocurrency needs. With a commitment to security, convenience, and community, CryptoHaven is the perfect platform for buying, selling, and managing digital assets.`}
                  </Row>
                </Col>
              </Panel>
            </Collapse>
          </Col>
        ))}
      </Row>
    </>
  );
};

export default Exchanges;
