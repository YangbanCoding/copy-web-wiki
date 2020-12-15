# [카피 - 나무위키] 양반위키 v0.1

## 예제 웹 사이트
[https://yangban-wiki.vercel.app/](https://yangban-wiki.vercel.app/)
## 예제 실행 하기
git bash에서
```bash
git clone https://github.com/yangbancoding/copy-web-wiki
cd copy-web-wiki
```
백엔드

```bash
cd hasura
hasura migrate apply
hasura metadata apply
```
프론트엔드
```bash
cd web
npm install
npm run dev
```
[예제 실행 방법 자세히 보기](https://github.com/YangbanCoding/yangban-beginner/blob/main/docs/back-practice.MD)

## 영상
[![카피웹 - 나무위키](http://img.youtube.com/vi/nj8HvLCa1-U/0.jpg)](http://www.youtube.com/watch?v=nj8HvLCa1-U "카피웹 - 나무위키")

## 선행 강의
- [입문 웹](https://github.com/YangbanCoding/yangban-beginner/tree/main/examples/lesson1-tutorial)
- [입문 백엔드](https://github.com/YangbanCoding/yangban-beginner/tree/main/examples/back1-tutorial)
- 입문 프론트엔드(준비 중)

## 요구사항
- 누구나 새로운 위키 문서를 생성할 수 있다
- 누구나 모든 위키 문서를 열람할 수 있다
- 생성된 위키 문서는 수정, 삭제할 수 없다
- 모바일 환경만 지원

## 페이지
- / : 메인 페이지
- /w/[문서이름] : 문서의 최근 버전 보기
- /w/[문서이름]?version=[버전] : 문서의 특정 버전 보기
- /edit/[문서이름] : 새로운 문서 생성하기
- /history/[문서이름] : 문서의 모든 버전 보기

## DB 테이블
- wiki_doc : title(Primary Key)
- doc_version : id(Primary Key), created_at, body, version

## 테이블 관계
- one to many
  - wiki_doc -> doc_version

## API
- 공통
  - 문서 제목으로 문서 찾기
    - Query wiki_doc_pk
- /w/[문서이름]
  - 해당 문서의 최신 버전 읽기
    - Query wiki_doc_pk
- /edit/[문서이름]
  - 해당 문서의 최신 버전 읽기
    - Query wiki_doc_pk
  - 새로운 문서 생성하기
    - Mutation insert_wiki_doc
  - 문서의 새로운 버전 생성하기
    - Mutation insert_doc_version
- /history[문서이름]
  - 해당 문서의 모든 버전 읽기
    - Query wiki_doc_pk

## 테스트
### 문서 검색
- 검색 창에 문서 이름을 입력한다
  - 문서가 있는 경우 최신 버전의 문서를 표시한다
  - 문서가 없는 경우 새 문서 작성 링크를 표시한다
### 새 문서 작성
  - 새로운 문서를 작성 완료 하면 해당 문서 페이지로 이동한다
### 기존 문서 편집
  - 기존 문서를 편집하면 해당 문서 페이지가 편집한 문서로 대체된다
  - 기존 버전은 모두 유지된다
### 문서의 이전 버전 보기
  - 해당 문서의 역사 페이지에서 문서의 모든 버전을 볼 수 있다
  - 특정 버전을 클릭하면 그 버전의 문서를 볼 수 있다

## 작업 순서
1. 초기 설정
2. 백엔드 설정
3. 프론트 엔드 html, css 작업
4. 프론트 엔드 javascript 작업
5. 테스트
