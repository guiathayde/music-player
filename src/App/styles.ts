import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  width: 100vw;
  height: 100vh;
`;

export const PlayerContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 30px;
  gap: 30px;

  width: 358px;

  background: #2a2141;
  border-radius: 10px;
`;

export const Heading = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  gap: 30px;

  width: 100%;
`;

export const SongImg = styled.img`
  width: 84px;
  height: 84px;

  border-radius: 6px;
`;

export const SongInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;

  margin-left: auto;
  margin-right: auto;
`;

export const SongName = styled.h1`
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 700;
  font-size: 24px;
  line-height: 100%;
  color: #e1e1e6;
`;

export const SongAuthor = styled.h2`
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 400;
  font-size: 20px;
  line-height: 100%;
  color: #e1e1e6;
`;

export const SongControls = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  gap: 50px;

  width: 70%;
`;

export const SongControl = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;

  width: 28px;
  height: 28px;

  border: none;

  background-color: transparent;

  img {
    width: 28px;
    height: 28px;
  }
`;

export const SongProgress = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: 9.6px;

  width: 100%;
`;

export const SongProgressBar = styled.progress`
  width: 100%;
  height: 6px;

  border-radius: 9.7px;
  box-shadow: 1px 1px 4px rgba(0, 0, 0, 0.2);

  &::-webkit-progress-bar {
    background-color: rgba(217, 217, 217, 0.3);
    opacity: 0.3;
    border-radius: 9.7px;
  }
  &::-webkit-progress-value {
    background-color: rgba(217, 217, 217, 0.8);
    border-radius: 9.7px;
  }
`;

export const SongProgressTextContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  width: 100%;
`;

export const SongProgressText = styled.h3`
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 160%;
  color: #c4c4cc;
`;

export const SongVolumeContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;

  width: 100%;
`;

export const SongVolumeIcon = styled.img`
  width: 28.81px;
  height: 24.62px;
`;

export const SongVolumeBar = styled.input`
  -webkit-appearance: none;
  width: 80%;
  height: 6px;
  border-radius: 9.7px;
  box-shadow: 1px 1px 4px rgba(0, 0, 0, 0.2);
  outline: none;
  background-color: rgba(217, 217, 217, 0.3);

  -webkit-transition: 0.2s;
  transition: opacity 0.2s;

  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 16px;
    height: 16px;
    border-radius: 50%;
    background-color: rgba(217, 217, 217, 1);
    cursor: pointer;
  }

  &::-moz-range-thumb {
    width: 25px;
    height: 25px;
    background: #04aa6d;
    cursor: pointer;
  }
`;
