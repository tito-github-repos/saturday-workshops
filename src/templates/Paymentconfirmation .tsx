// src\templates\paymentConfirmation.tsx
import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Preview,
  Section,
  Row,
  Column,
  Text,
} from "@react-email/components";

interface PaymentConfirmationProps {
  name: string;
  course: string;
  amount: string; // e.g. "2,222"
  paymentId: string;
  paidOn: string;
}

export default function PaymentConfirmation({
  name,
  course,
  amount,
  paymentId,
  paidOn,
}: PaymentConfirmationProps) {
  return (
    <Html>
      <Head />
      <Preview>Your payment was successful 🎉</Preview>

      <Body
        style={{
          backgroundColor: "#f5f7fa",
          fontFamily: "Arial, sans-serif",
          padding: "30px 0",
        }}
      >
        <Container
          style={{
            maxWidth: "600px",
            margin: "0 auto",
            backgroundColor: "#ffffff",
            borderRadius: "8px",
            border: "1px solid #e5e7eb",
            padding: "30px",
          }}
        >
          <Heading
            style={{
              color: "#0f766e",
              fontSize: "26px",
              marginBottom: "20px",
            }}
          >
            Payment Successful 🎉
          </Heading>

          <Text>
            Dear <strong>{name}</strong>,
          </Text>

          <Text>
            Thank you! We have received your payment and your enrollment is
            confirmed.
          </Text>

          <Section
            style={{
              backgroundColor: "#f8fafc",
              border: "1px solid #e2e8f0",
              borderRadius: "6px",
              padding: "15px",
              marginTop: "20px",
              marginBottom: "20px",
            }}
          >
            <Row>
              <Column>
                <Text>
                  <strong>Course:</strong> {course}
                </Text>

                <Text>
                  <strong>Amount Paid:</strong> ₹{amount}
                </Text>

                <Text>
                  <strong>Payment ID:</strong> {paymentId}
                </Text>

                <Text>
                  <strong>Paid On:</strong> {paidOn}
                </Text>
              </Column>
            </Row>
          </Section>

          <Text>
            Our team will contact you  within 24hrs for further details.
             If you have any
            questions, feel free to contact us.
          </Text>

          <Section
            style={{
              marginTop: "30px",
              borderTop: "1px solid #e5e7eb",
              paddingTop: "20px",
            }}
          >
            <Text
              style={{
                fontWeight: "bold",
                color: "#0f172a",
              }}
            >
              Saturday Workshops Team
            </Text>

            <Text
              style={{
                fontSize: "13px",
                color: "#64748b",
              }}
            >
              saturdayworkshops.com
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}