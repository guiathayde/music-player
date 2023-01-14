import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import GlobalStyle from '../styles/global';

import {
  Container,
  PlayerContainer,
  Heading,
  SongImg,
  SongInfo,
  SongName,
  SongAuthor,
  SongControls,
  SongControl,
  SongProgress,
  SongProgressBar,
  SongProgressTextContainer,
  SongProgressText,
  SongVolumeContainer,
  SongVolumeIcon,
  SongVolumeBar,
} from './styles';

import PlayBackIcon from '../assets/play-back.svg';
import PlayIcon from '../assets/play.svg';
import PauseIcon from '../assets/pause.svg';
import PlayForwardIcon from '../assets/play-forward.svg';
import VolumeIcon from '../assets/volume.svg';

import FelinaImg from '../assets/songs/felina.jpg';
import FelinaSong from '../assets/songs/felina.mp3';

import OQIGAPImg from '../assets/songs/OQIGAP.jpeg';
import OQIGAPSong from '../assets/songs/OQIGAP.mp3';

import VeSeNaoMeEsqueceMaisImg from '../assets/songs/ve_se_nao_me_esquece_mais.jpeg';
import VeSeNaoMeEsqueceMaisSong from '../assets/songs/ve_se_nao_me_esquece_mais.mp3';

export function App() {
  const [currentSong, setCurrentSong] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);

  const audio = useRef<HTMLAudioElement>(null);

  const songs = useMemo(
    () => [
      {
        name: 'Felina 🐈',
        author: 'WIU & Ryan SP',
        img: FelinaImg,
        src: FelinaSong,
      },
      {
        name: 'OQIGAP?',
        author:
          'MC IG, Davi, Ryan SP, Hariel, Don Juan, Cebezinho, NK, MC Rick e Tigre (DJ Oreia)',
        img: OQIGAPImg,
        src: OQIGAPSong,
      },
      {
        name: 'Vê se não me esquece mais',
        author: 'LAYPOLD ft. Vô Cabelo',
        img: VeSeNaoMeEsqueceMaisImg,
        src: VeSeNaoMeEsqueceMaisSong,
      },
    ],
    [],
  );

  const handlePlayPause = useCallback(async () => {
    if (audio.current != null)
      if (isPlaying) {
        audio.current.pause();
        setIsPlaying(false);
      } else {
        await audio.current.play();
        setIsPlaying(true);
      }
  }, [audio, isPlaying]);

  const handleNextSong = useCallback(async () => {
    let currentSongUpdated = 0;
    if (currentSong + 1 < songs.length) currentSongUpdated = currentSong + 1;
    else currentSongUpdated = 0;

    setCurrentSong(currentSongUpdated);

    if (audio.current != null) {
      audio.current.pause();
      audio.current.src = songs[currentSongUpdated].src;
      audio.current.load();
      audio.current
        .play()
        .then(() => {
          setIsPlaying(true);
        })
        .catch(() => {
          setIsPlaying(false);
        });
    }
  }, [audio, currentSong, songs]);

  const handlePreviousSong = useCallback(async () => {
    let currentSongUpdated = 0;
    if (currentSong - 1 >= 0) currentSongUpdated = currentSong - 1;
    else currentSongUpdated = songs.length - 1;

    setCurrentSong(currentSongUpdated);

    if (audio.current != null) {
      audio.current.pause();
      audio.current.src = songs[currentSongUpdated].src;
      audio.current.load();
      audio.current
        .play()
        .then(() => {
          setIsPlaying(true);
        })
        .catch(() => {
          setIsPlaying(false);
        });
    }
  }, [audio, currentSong, songs]);

  function secondsToMinutes(secondsTotal: number) {
    const minutes = Math.trunc(secondsTotal / 60);
    const seconds = Math.trunc(secondsTotal % 60);

    let minutesString = minutes.toString();
    let secondsString = seconds.toString();
    if (minutes < 10) minutesString = `0${minutes}`;
    if (seconds < 10) secondsString = `0${seconds}`;

    return `${minutesString}:${secondsString}`;
  }

  useEffect(() => {
    const currentAudio = audio.current;

    if (currentAudio != null) {
      currentAudio.addEventListener('loadedmetadata', e => {
        const target = e.target as HTMLAudioElement;
        setDuration(target.duration);
      });

      currentAudio.addEventListener('timeupdate', e => {
        const target = e.target as HTMLAudioElement;
        setCurrentTime(target.currentTime);
      });
    }

    return () => {
      if (currentAudio != null) {
        currentAudio.removeEventListener('loadedmetadata', () => {});
        currentAudio.removeEventListener('timeupdate', () => {});
      }
    };
  }, [audio, currentSong]);

  useEffect(() => {
    if (audio.current != null) audio.current.volume = volume;
  }, [audio, volume]);

  return (
    <>
      <GlobalStyle />

      <audio ref={audio} src={songs[currentSong].src} />

      <Container>
        <PlayerContainer>
          <Heading>
            <SongImg src={songs[currentSong].img} />

            <SongInfo>
              <SongName>{songs[currentSong].name}</SongName>
              <SongAuthor>{songs[currentSong].author}</SongAuthor>
            </SongInfo>
          </Heading>

          <SongControls>
            <SongControl
              onClick={async () => {
                await handlePreviousSong();
              }}
            >
              <img src={PlayBackIcon} alt="Play Back" />
            </SongControl>
            <SongControl
              onClick={async () => {
                await handlePlayPause();
              }}
            >
              <img src={isPlaying ? PauseIcon : PlayIcon} alt="Play" />
            </SongControl>
            <SongControl
              onClick={async () => {
                await handleNextSong();
              }}
            >
              <img src={PlayForwardIcon} alt="Play Forward" />
            </SongControl>
          </SongControls>

          <SongProgress>
            <SongProgressBar value={(currentTime * 100) / duration} max={100} />

            <SongProgressTextContainer>
              <SongProgressText>
                {secondsToMinutes(currentTime)}
              </SongProgressText>
              <SongProgressText>{secondsToMinutes(duration)}</SongProgressText>
            </SongProgressTextContainer>
          </SongProgress>

          <SongVolumeContainer>
            <SongVolumeIcon src={VolumeIcon} alt="Volume" />

            <SongVolumeBar
              type="range"
              min={0}
              max={100}
              value={volume * 100}
              onChange={e => {
                setVolume(Number(e.target.value) / 100);
              }}
            />
          </SongVolumeContainer>
        </PlayerContainer>
      </Container>
    </>
  );
}
