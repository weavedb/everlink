"use client";

import ProfileHeader from "@/components/profile/profile-header";
import ProfileDetails from "@/components/profile/profile-details";
import {
  Box,
  ChakraProvider,
  useToast,
  Container,
  Button,
  Grid,
  GridItem,
} from "@chakra-ui/react";
import { ssr } from "arnext";
import { useEffect, useState } from "react";
import { useMediaQuery } from "@chakra-ui/react";
import Head from "next/head";

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
  const [isLargeScreen] = useMediaQuery("(min-width: 700px)");

  const [credentials, setCredentials] = useState({
    UserName: "",
    Description: "",
    SubDomain: "",
    TransactionId: "",
    Owner: "",
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

        setCredentials(() => ({
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
  }, []);

  const formatUrl = (url) => {
    if (!/^https?:\/\//i.test(url)) {
      return `https://${url}`;
    }
    return url;
  };
  return (
    <>
      <ChakraProvider>
        <Head>
          <title>Link Tree</title>
        </Head>
        <Container maxW="container.xl" p={4}>
          <Grid
            templateColumns={{
              md: "35% 1fr",
            }}
            gap={4}
          >
            <GridItem>
              <Box>
                <ProfileHeader {...credentials} />
                <ProfileDetails {...credentials} />
              </Box>
            </GridItem>
            <GridItem>
              <Box display="flex" flexDir="column" gap={3}>
                <Button
                  borderRadius="full"
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <span></span>
                  <span>💡 Link</span>

                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                  >
                    <title>external_link_line</title>
                    <g id="external_link_line" fill="none">
                      <path d="M24 0v24H0V0zM12.593 23.258l-.011.002-.071.035-.02.004-.014-.004-.071-.035c-.01-.004-.019-.001-.024.005l-.004.01-.017.428.005.02.01.013.104.074.015.004.012-.004.104-.074.012-.016.004-.017-.017-.427c-.002-.01-.009-.017-.017-.018m.265-.113-.013.002-.185.093-.01.01-.003.011.018.43.005.012.008.007.201.093c.012.004.023 0 .029-.008l.004-.014-.034-.614c-.003-.012-.01-.02-.02-.022m-.715.002a.023.023 0 0 0-.027.006l-.006.014-.034.614c0 .012.007.02.017.024l.015-.002.201-.093.01-.008.004-.011.017-.43-.003-.012-.01-.01z" />
                      <path
                        fill="#09244BFF"
                        d="M11 6a1 1 0 1 1 0 2H5v11h11v-6a1 1 0 1 1 2 0v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2zm9-3a1 1 0 0 1 1 1v5a1 1 0 1 1-2 0V6.414l-8.293 8.293a1 1 0 0 1-1.414-1.414L17.586 5H15a1 1 0 1 1 0-2Z"
                      />
                    </g>
                  </svg>
                </Button>

                <Button
                  borderRadius="full"
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <span></span>
                  <span>💡 Link</span>

                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                  >
                    <title>external_link_line</title>
                    <g id="external_link_line" fill="none">
                      <path d="M24 0v24H0V0zM12.593 23.258l-.011.002-.071.035-.02.004-.014-.004-.071-.035c-.01-.004-.019-.001-.024.005l-.004.01-.017.428.005.02.01.013.104.074.015.004.012-.004.104-.074.012-.016.004-.017-.017-.427c-.002-.01-.009-.017-.017-.018m.265-.113-.013.002-.185.093-.01.01-.003.011.018.43.005.012.008.007.201.093c.012.004.023 0 .029-.008l.004-.014-.034-.614c-.003-.012-.01-.02-.02-.022m-.715.002a.023.023 0 0 0-.027.006l-.006.014-.034.614c0 .012.007.02.017.024l.015-.002.201-.093.01-.008.004-.011.017-.43-.003-.012-.01-.01z" />
                      <path
                        fill="#09244BFF"
                        d="M11 6a1 1 0 1 1 0 2H5v11h11v-6a1 1 0 1 1 2 0v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2zm9-3a1 1 0 0 1 1 1v5a1 1 0 1 1-2 0V6.414l-8.293 8.293a1 1 0 0 1-1.414-1.414L17.586 5H15a1 1 0 1 1 0-2Z"
                      />
                    </g>
                  </svg>
                </Button>
              </Box>
            </GridItem>
          </Grid>
        </Container>
      </ChakraProvider>
    </>
  );
}
