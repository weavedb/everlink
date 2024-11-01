import ProfileHeader from "@/components/profile/profile-header";
import ProfileDetails from "@/components/profile/profile-details";
import { Box, ChakraProvider, useToast, Divider } from "@chakra-ui/react";
import { ssr } from "arnext";
import { useEffect, useState } from "react";
import SocialCard from "@/components/card/social-card";

const getDate = async (date) => date ?? Date.now();
const getFullUrl = async (url) => url ?? window.location.href;

export const getStaticProps = ssr(async () => {
  return { props: { _date: Date.now(), _fullUrl: null }, revalidate: 100 };
});

const _resultData = {
  Urls: '[{"title":"Spotify","url":"https://open.spotify.com/artist/0Upodw08tSULrSx6MrBybj?si=EA_nlybJSp6gfXzm1RIEQw"},{"title":"Website","url":"https://fizzlesmusic.com/"},{"title":"YouTube","url":"https://www.youtube.com/@fizzlesmusic"}]',
  TTL: "900",
  TransactionId: "BXNtVGO1ZoGhlUzBb0fX7tVL15rtu6xb-lWEtMP2u-U",
  Description:
    "3 friends share the same passion as music enthusiasts from the southern outskirts of Cebu.",
  Owner: "8bIZKr6Wn15dYdkyXRfwaX7t_-MPzKB8w-WYxCyIXIw",
  SubDomain: "fizzles",
  Username: "Fizzles",
};

export default function Home({ _date = null, _fullUrl = null }) {
  const toast = useToast();

  const [credentials, setCredentials] = useState({
    UserName: "",
    Description: "",
  });

  const [date, setDate] = useState(_date);
  const [fullUrl, setFullUrl] = useState(_fullUrl);
  const [links, setLinks] = useState([]);
  const [subdomain, setSubdomain] = useState();

  useEffect(() => {
    (async () => {
      if (!_fullUrl) {
        const _fullUrl = await getFullUrl();
        setFullUrl(_fullUrl);
        console.log("_fullUrl", _fullUrl);

        const _subdomain = _fullUrl.split("//")[1].split("_")[0];
        console.log("_subdomain:", _subdomain);
        setSubdomain(_subdomain);

        let tags = [
          { name: "Action", value: "Record" },
          {
            name: "Sub-Domain",
            value: _subdomain,
          },
        ];

        // const _result = await dryrun({
        //   process: MAIN_PROCESS_ID,
        //   tags,
        // });
        // console.log("_result", _result);
        // const _resultData = _result.Messages[0].Data;
        // const jsonData = JSON.parse(_resultData);
        const jsonData = _resultData;

        setCredentials((prev) => ({
          ...prev,
          ...jsonData,
        }));

        if (typeof jsonData.Urls === "string") {
          const _links = JSON.parse(jsonData.Urls);
          setLinks(_links);
          console.log("_links", _links);
        }
      }
      _date ?? setDate(await getDate());
    })();
  }, [_fullUrl, _date]);

  const formatUrl = (url) => {
    if (!/^https?:\/\//i.test(url)) {
      return `https://${url}`;
    }
    return url;
  };
  return (
    <>
      <ChakraProvider>
        <ProfileHeader />
        <ProfileDetails />
        <Divider />
        <Box display="flex" flexDir="column" gap={2} padding={4}>
          <SocialCard />
        </Box>
      </ChakraProvider>
    </>
  );
}
