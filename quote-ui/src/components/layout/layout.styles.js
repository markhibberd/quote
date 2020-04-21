import styled from 'styled-components';

const Block = styled.div`
  display: block;
  height: 100%;
  width: 100%;
  position: relative;
`;

const Row = styled.div`
  display: flex;
  flex-direction: row;
  height: 100%;
  width: 100%;
  flex: 0 1 auto;
  position: relative;
  justify-content: ${({ center }) => center ? 'center' : 'flex-start'};
  align-items: ${({ center }) => center ? 'center' : 'flex-start'};
`;

const Column = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  flex: 0 1 auto;
  position: relative;
  justify-content: ${({ center }) => center ? 'center' : 'flex-start'};
  align-items: ${({ center }) => center ? 'center' : 'flex-start'};
`;

export { Block, Row, Column };
