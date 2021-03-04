---
title: 웹 접근성 개선
published: true
datePublished: 1594425078471
author: Jeffrey
tags:
  - 접근성
authorPhoto: /img/profile.png
thumbnailPhoto: /img/web-accessibility.jpg
---

웹 접근성 개선을 진행했던 경험을 공유합니다.

웹 접근성을 개선한다는 것은 장애인 접근성을 보장할 수 있도록 웹 콘텐츠 접근성 지침을 적용하는 것.


> **웹 접근성 4원칙** <br />

> 인식의 용이성: 모든 콘텐츠는 사용자가 인식할 수 있어야 한다.<br />
운용의 용이성: 사용자 인터페이스 구성 요소는 조작 가능하고 내비게이션할 수 있어야 한다.<br />
이해의 용이성: 콘텐츠는 이해할 수 있어야 한다.<br />
견고성: 웹 콘텐츠는 미래의 기술로도 접근할 수 있도록 견고하게 만들어야 한다.

## 웹 접근성 평가 도구
HTML 코드를 분석하여 기계적으로 추출 가능한 항목을 점검합니다. 도구는 평가 시간을 절약하고 편의성을 도모합니다. 웹 접근성 평가는 도구에 의한 자동 평가와 사람에 의한 수동 평가를 병행합니다. Chrome 브라우저에서 다양한 웹 접근성 평가 도구를 지원하고 있습니다.

### [OpenWax](https://chrome.google.com/webstore/detail/openwax/bfahpbmaknaeohgdklfbobogpdngngoe?hl=ko)
1 페이지씩 16개 항목을 검사합니다. 각 항목은 웹 콘텐츠 접근성 지침의 내용을 따릅니다.

### [WAVE](https://chrome.google.com/webstore/detail/wave-evaluation-tool/jbbplnpkjmmeebjpijfedlgcdilocofh?hl=ko)
[WebAIM](https://webaim.org/)(Web Accessibility In Mind, 웹에임, 웹 접근성 전문 비영리 기관)에서 제공하는 검사 도구입니다. 엘리먼트에 아이콘을 표시하여 어떤 속성을 어떻게 사용하는지 직관적으로 표시합니다. 개발자가 작업할 부분에 대해 간결하고 높은 수준의 정보를 제공합니다.

### [Lighthouse](https://developers.google.com/web/tools/lighthouse?hl=ko)
웹 앱의 품질을 개선하는 오픈 소스 자동화 도구입니다. 확인할 URL을 지정하고, 페이지에 대한 테스트를 실행한 다음, 페이지에 대한 보고서를 생성합니다.

### [ChromeVox](https://chrome.google.com/webstore/detail/screen-reader/kgejglhpjiefppelpmljglcjbhoiplfn)
화면의 내용을 음성으로 읽어주는 스크린 리더 서비스입니다. [Google Chromebook](https://www.google.com/chromebook/) 서비스에서 시각 장애인을 위한 내장 스크린 리더로 ChromeVox 서비스를 사용하고 있습니다.

## 개선 내용
### 적절한 대체 텍스트 제공 (1.1.1)

**이미지 버튼**<br/>
각각의 이미지에 적절한 텍스트를 제공합니다. 간단한 문구는 명사에 조사를 붙일 경우 오히려 방해 요소로 작용할 수 있기 때문에 제외합니다. (예: 카카오로로그인 → 카카오로그인)

```
// 변경 전
<button type="button" class="facebook">페이스북으로 로그인</button>
<button type="button" class="kakao">카카오</button>
```

```
// 변경 후
<button type="button" class="facebook">페이스북 로그인</button>
<button type="button" class="kakao">카카오 로그인</button>
```
<br />

**레이블이 없는 버튼**<br />
아이콘 버튼으로 표시하는 경우 레이블이 없으므로 `aria-label` 속성을 사용하여 작업을 명확하게 설명합니다.

```
// 변경 전
<button
  className={cx(
    styles.notification,
    { [styles.showBadge]: notificationCount },
  )}
>
  ...
</button>
```


```
// 변경 후
<button
  className={cx(
    styles.notification,
    { [styles.showBadge]: notificationCount },
  )}
  aria-label="알림"
>
  ...
</button>
```
<br />

### 키보드 사용 보장 (2.1.1)

**의미가 없는 요소**<br />
시맨틱 태그가 아닌 경우 role 속성으로 적절한 역할을 부여합니다.

```
<label>
  <input type="checkbox" title="아이디 저장" />
  <span class="checkbox">아이디 저장</span>
</label>
```
```
<label>
  <input type="checkbox" title="아이디 저장" />
  <span class="checkbox" role="checkbox" tabindex="0" aria-label="아이디 저장">아이디 저장</span>
</label>
```
> **tabindex** <br/>
> 순서를 설정하는 HTML 속성입니다. 초점을 받을 수 없는 요소를 인식할 필요가 있을 때 사용합니다. 탭 키 또는 `focus()` 메서드를 호출하는 방식으로 요소에 초점을 제공할 수 있습니다.
<br />

### 초점 이동 (2.1.2)

**논리적 순서 이동**<br />
초점은 좌에서 우, 상에서 하 순서로 이동합니다. 다음 주황색 영역과 같이 버튼 토글로 콘텐츠를 숨기거나 표시하는 경우 콘텐츠 숨기기 기법으로 초점 이동을 방해하지 않도록 합니다.

> **콘텐츠 숨기기**<br />
- 콘텐츠를 읽지 않고 숨김: `display: none;`
- 콘텐츠를 읽지 않고 숨김, 영역은 유지: `visibility: hidden;`
- 콘텐츠를 읽고 숨김: `overflow: hidden;` `width: 0`; `height: 0;`
- 콘텐츠를 읽고 숨김, 영역은 유지 : `opacity: 0;`
- 조건에 따라 콘텐츠를 읽지 않고 숨겨야 하는 경우 스타일에 ① 속성을 적용합니다. 콘텐츠의 영역을 유지해야 하거나 애니메이션 효과가 있다면 ② 속성을 적용합니다. 반대로 콘텐츠를 숨기지만 읽어야 하는 경우 ③ 속성을 적용합니다. 콘텐츠의 영역을 유지해야 한다면 ④ 속성을 적용합니다.

트랜지션 속성이 있는 경우 애니메이션 효과에 영향을 미치지 않도록 `visibility` 속성을 적용합니다.
```
// 변경 전
.container {
  transition: max-height 0.35s ease-in-out;
  max-height: 0;
  overflow: hidden;
  ...
 
  &.active {
    transition-delay: 0.1s;
    max-height: 500px;
  }
}
```

```
// 변경 후
.container {
  transition-property: visibility, max-height;
  transition-duration: 0.35s;
  transition-timing-function: ease-in-out;
  visibility: hidden;
  max-height: 0;
  overflow: hidden;
  ...
 
  &.active {
    transition-delay: 0.1s;
    visibility: visible;
    max-height: 500px;
  }
}
```
<br />

**중복 링크**<br />
섬네일 이미지 링크와 링크 텍스트가 같은 목적지를 갖는 경우 `aria-hidden="true"` 속성을 적용하여 링크를 하나만 제공합니다. 반복되는 링크가 사라지기 때문에 탐색의 효율성이 증가하고 혼동을 피할 수 있습니다. 

```
<div class="card">
  <a class="thumbnail" href="/web/project">
  <div class="info">
    <a class="thumbnail" href="/web/project">
  </div>
</div>
```

```
<div class="card">
  <a href="/web/project">
  <div class="info">
    <a href="/web/project" aria-hidden="true" tabindex="-1">
  </div>
</div>
```
> 링크, 버튼과 같이 초점을 받을 수 있는 요소를 `aria-hidden="true"` 속성으로 숨긴 경우 키보드 또는 마우스 사용자가 해당 컨트롤에 초점이 제공되어 탐색에 혼란이 있을 수 있으므로 `tabindex="-1"` 속성을 적용하여 컨트롤에 대한 초점을 제거해야 합니다.
<br />

### 적절한 링크 텍스트 (2.4.3)

**이미지 링크**<br />
링크나 버튼 등의 컨트롤 요소에 이미지가 있는 경우 IR 기법으로 대체 텍스트를 제공합니다.
> **IR(Image Replacement) 기법**<br />
> 이미지를 볼 수 없는 사용자에게 적절한 텍스트를 제공하는 기법입니다.

```
<h1 className="wadiz-logo">
  <span className="label">와디즈</span>
  <a href="/">
    ...
  </a>
</h1>
```

```
<h1 className="wadiz-logo">
  <a href="/">
    <span className="label">와디즈</span>
    ...
  </a>
</h1>
```
<br />

### 레이블 제공 (3.4.1)
**시각적으로 노출되지 않은 레이블**<br />
입력 서식에 `title` 속성을 적용합니다.

```
<input type="email" placeholder="이메일 아이디" />
```

```
<input type="email" placeholder="이메일 아이디" title="이메일 아이디" />
```
<br />

## 결과
### OpenWax
검사 결과 약 17% 개선되었습니다. 

### Lighthouse
검사 결과 Accessibility 점수가 23점 향상되었고, 로그인 페이지의 웹 접근성 점수가 대폭 높아졌습니다.
<br />

## 앞으로의 고민
### 접근성과 디자인의 경계
저시력자를 위해 웹 접근성을 보장하는 디자인을 하면, 색 대비 평가 기준은 높은 점수를 받겠지만 상대적으로 취약한 디자인이 나올 수밖에 없습니다. 중요한 점은 서비스의 주 이용자가 일반적인 시력을 가진 다수자라는 데 있습니다. 따라서 소수자 중에 다수자까지 만족시키는 디자인이 앞으로의 목표입니다.

<br />
<br />
<br />
