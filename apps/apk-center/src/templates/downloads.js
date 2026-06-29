import React from 'react';
import Helmet from 'react-helmet';
import styled from '@emotion/styled';
import { Layout } from '$components';
import { StyledHeading } from '../components/styles/Docs';

const PageWrapper = styled.div`
  max-width: 900px;
`;

const Description = styled.p`
  font-size: 16px;
  color: ${(props) => (props.theme && props.theme.colors ? props.theme.colors.text : '#555')};
  margin-bottom: 32px;
  line-height: 1.7;
`;

const ApkGrid = styled.div`
  display: grid;
  gap: 16px;
`;

const ApkCard = styled.div`
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  padding: 24px;
  background: #ffffff;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.06);
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;

  @media (max-width: 600px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

const ApkInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  flex: 1;
  min-width: 0;
`;

const ApkIcon = styled.div`
  width: 48px;
  height: 48px;
  border-radius: 12px;
  background: linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  font-size: 22px;
`;

const ApkMeta = styled.div`
  min-width: 0;
`;

const ApkName = styled.div`
  font-size: 16px;
  font-weight: 600;
  color: #1a202c;
  word-break: break-all;
  margin-bottom: 4px;
`;

const ApkDetails = styled.div`
  font-size: 13px;
  color: #718096;
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
`;

const DownloadButton = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 10px 20px;
  background: #4f46e5;
  color: #ffffff !important;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  text-decoration: none !important;
  white-space: nowrap;
  transition: background 0.2s;
  flex-shrink: 0;

  &:hover {
    background: #4338ca;
  }
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 60px 20px;
  color: #718096;
  border: 2px dashed #e2e8f0;
  border-radius: 12px;
`;

const EmptyIcon = styled.div`
  font-size: 48px;
  margin-bottom: 16px;
`;

const EmptyTitle = styled.div`
  font-size: 18px;
  font-weight: 600;
  color: #4a5568;
  margin-bottom: 8px;
`;

const EmptyDesc = styled.div`
  font-size: 14px;
  line-height: 1.6;
`;

const CodeBlock = styled.code`
  background: #f7fafc;
  border: 1px solid #e2e8f0;
  border-radius: 4px;
  padding: 2px 8px;
  font-size: 13px;
  color: #553c9a;
`;

function formatDate(isoString) {
  const d = new Date(isoString);
  return d.toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

const DownloadsPage = ({ pageContext, ...props }) => {
  const apkFiles = (pageContext && pageContext.apkFiles) || [];

  return (
    <Layout {...props}>
      <Helmet>
        <title>APK 다운로드 | AZIT APK Center</title>
        <meta name="description" content="AZIT 안드로이드 앱 APK 파일 다운로드" />
      </Helmet>
      <PageWrapper>
        <EmptyTitle>AZIT 안드로이드 테스트 다운로드</EmptyTitle>
        <Description>
          APK / AAB 파일을 다운로드할 수 있어요. APK는 기기에서{' '}
          <strong>알 수 없는 출처 설치</strong>를 허용하면 바로 설치할 수 있으며, AAB는 Google Play
          스토어 배포용 파일이에요.
        </Description>

        {apkFiles.length === 0 ? (
          <EmptyState>
            <EmptyIcon>📦</EmptyIcon>
            <EmptyTitle>등록된 파일이 없습니다</EmptyTitle>
            <EmptyDesc>
              APK / AAB 파일을 <CodeBlock>static/downloads/</CodeBlock> 폴더에 넣고 빌드하면 여기에
              표시됩니다.
            </EmptyDesc>
          </EmptyState>
        ) : (
          <ApkGrid>
            {apkFiles.map((apk) => {
              const isAab = apk.filename.endsWith('.aab');
              return (
                <ApkCard key={apk.filename}>
                  <ApkInfo>
                    <ApkIcon>{isAab ? '📦' : '📱'}</ApkIcon>
                    <ApkMeta>
                      <ApkName>{apk.filename}</ApkName>
                      <ApkDetails>
                        <span>{isAab ? 'AAB' : 'APK'}</span>
                        <span>크기: {apk.size}</span>
                        <span>업데이트: {formatDate(apk.modifiedAt)}</span>
                      </ApkDetails>
                    </ApkMeta>
                  </ApkInfo>
                  <DownloadButton href={apk.url} download={apk.filename}>
                    ⬇ 다운로드
                  </DownloadButton>
                </ApkCard>
              );
            })}
          </ApkGrid>
        )}
      </PageWrapper>
    </Layout>
  );
};

export default DownloadsPage;
