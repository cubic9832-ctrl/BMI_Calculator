const heightInput = document.querySelector("#height");
const weightInput = document.querySelector("#weight");
const calcButton = document.querySelector("#btn-cal");
const removeButton = document.querySelector("#btn-res");

const bmiResult = document.querySelector("#bmi-result");
const bmiMessage = document.querySelector("#bmi-message");

// BMI 계산 버튼
calcButton.addEventListener("click", function () {
  const height = Number(heightInput.value);
  const weight = Number(weightInput.value);

  // 빈 값 예외 처리
  if (!height || !weight) {
    bmiResult.textContent = "키와 몸무게를 모두 입력해 주세요.";
    bmiMessage.textContent = "";
    return;
  }

  // 0 이하 값 예외 처리
  if (height <= 0 || weight <= 0) {
    bmiResult.textContent = "키와 몸무게는 0보다 큰 숫자여야 합니다.";
    bmiMessage.textContent = "";
    return;
  }

  // cm를 m로 변환
  const heightMeter = height / 100;

  // BMI 계산
  const bmi = weight / (heightMeter * heightMeter);

  // 소수점 첫째 자리까지 표시
  const bmiFixed = bmi.toFixed(1);

  // BMI 분류
  let status = "";

  if (bmi < 18.5) {
    status = "저체중";
  } else if (bmi >= 18.5 && bmi < 23) {
    status = "정상";
  } else if (bmi >= 23 && bmi < 25) {
    status = "비만 전 단계";
  } else if (bmi >= 25 && bmi < 30) {
    status = "1단계 비만";
  } else if (bmi >= 30 && bmi < 35) {
    status = "2단계 비만";
  } else {
    status = "3단계 비만";
  }

  const resultText = `당신의 BMI는 ${bmiFixed}입니다.`;
  const messageText = `현재 상태는 ${status}입니다.`;

  // 화면에 결과 출력
  bmiResult.textContent = resultText;
  bmiMessage.textContent = messageText;

  // localStorage에 마지막 결과 저장
  localStorage.setItem("lastBmiResult", resultText);
  localStorage.setItem("lastBmiMessage", messageText);
});

// 초기화 버튼
removeButton.addEventListener("click", function () {
  heightInput.value = "";
  weightInput.value = "";

  bmiResult.textContent = "아직 계산하지 않았습니다.";
  bmiMessage.textContent = "";

  localStorage.removeItem("lastBmiResult");
  localStorage.removeItem("lastBmiMessage");
});