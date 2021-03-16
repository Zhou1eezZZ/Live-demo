import React, { useEffect, useState } from "react";
import Card from "@component/Card";
import Live from "@component/Live";
import Banner from "@component/Banner";
import "./index.css";

const url = `https://d1--cn-gotcha05.bilivideo.com/live-bvc/722583/live_7734200_bs_1348183_4000.flv?cdn=cn-gotcha05&expires=1615555739&len=0&oi=999685617&pt=web&qn=400&trid=39a334723d55441c9425811b150e317a&sigparams=cdn,expires,len,oi,pt,qn,trid&sign=e35ad55e21940a11636480b7350c3faf&ptype=0&src=141&sl=10&order=1`;
const fakeData = {
  img:
    "https://rpic.douyucdn.cn/live-cover/appCovers/2021/03/09/9645374_20210309173720_small.jpg/webpdy1",
  title: "xxxx的直播",
  url,
};

const requestUrl = "/api/hall?action=list_room";

function Hall() {
  const [show, setShow] = useState(false);
  const [list, setList] = useState(new Array(10).fill(fakeData));
  const [activeData, setActiveData] = useState("");
  const [info, setInfo] = useState("");
  const [bannerShow, setBannerShow] = useState(false);

  useEffect(() => {
    fetch(requestUrl)
      .then((res) => res.json())
      .then((res) => {
        const { rooms } = res;
        if (Array.isArray(rooms)) {
          setList(rooms);
        } else {
          throw new Error();
        }
      })
      .catch((e) => {
        setInfo("请求不成功");
        setBannerShow(true);
        setTimeout(() => {
          setBannerShow(false);
        }, 3000);
      });
  }, []);

  const openLive = (data) => {
    if (show) return;
    setActiveData(data);
    setShow(true);
  };

  return (
    <div className="hallWrapper">
      <div className="CardListWrapper">
        {list.map((l, i) => (
          <Card data={l} key={i} onClick={() => openLive(l)} />
        ))}
      </div>
      <Live show={show} data={activeData} onClose={() => setShow(false)} />
      <Banner show={bannerShow} info={info} />
    </div>
  );
}

export default Hall;
