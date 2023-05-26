async function showPlaylist(offset: number){
  const url = `https://c.y.qq.com/splcloud/fcgi-bin/fcg_get_diss_by_tag.fcg?picmid=1&loginUin=0&hostUin=0&format=json&inCharset=utf8&outCharset=utf-8&notice=0&platform=yqq.json&needNewCode=0&categoryId=10000000&sortId=5&sin=${offset}&ein=${29 +
  offset}`;
  await fetch(url, {
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
      return playlists
    })
    .catch((err) => {
      // console.error(err);
    });
}

export default function Demo() {
  
  return (
    <>
      <showPlaylist/>
    </>
  )
}