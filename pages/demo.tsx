import { Suspense } from "react";

function Showplaylists({ offset }: { offset: number }){
  const url = `https://c.y.qq.com/splcloud/fcgi-bin/fcg_get_diss_by_tag.fcg?picmid=1&loginUin=0&hostUin=0&format=json&inCharset=utf8&outCharset=utf-8&notice=0&platform=yqq.json&needNewCode=0&categoryId=10000000&sortId=5&sin=${offset}&ein=${29 +
  offset}`;
  return fetch(url, {
    headers: {
      Referer: 'https://y.qq.com/',
    },
  })
    .then(response => response.json())
    .then(r => {
      const playlists = r.data.list.map((item: { imgurl: any; dissname: any; dissid: any; }) => ({
        cover_img_url: item.imgurl,
        title: item.dissname,
        id: `qqplaylist_${item.dissid}`,
        source_url: `http://y.qq.com/#type=taoge&id=${item.dissid}`,
      }));
      return (
        <div>
          {
            playlists.map((item:any, index:number) => (
              <div key={index}>
                <img width={300} src={item.cover_img_url}/>
                <h2>{item.title}</h2>
                <div>{item.id}</div>
                <div><a href={item.source_url}>{item.title}</a></div>
              </div>
            ))
          }
        </div>
      )
    })
    .catch((err) => {
      console.error(err)
    });
}

export default function Demo() {
  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
        {/* @ts-expect-error Async Server Component */}
        <Showplaylists offset={0} />
      </Suspense>
    </>
  )
}