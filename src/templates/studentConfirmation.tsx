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

interface StudentConfirmationProps {
  name: string;
  course: string;
  workshopDate: string;
}

export default function StudentConfirmation({
  name,
  course,
  workshopDate,
}: StudentConfirmationProps) {
  return (
    <Html>
      <Head />
      <Preview>Your Workshop Registration is Confirmed 🎉</Preview>

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
            Registration Confirmed 🎉
          </Heading>

          <Text>Dear <strong>{name}</strong>,</Text>

          <Text>
            Thank you for registering for our workshop. We are excited to have
            you join us!
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
                  <strong>Workshop Date:</strong> {workshopDate}
                </Text>
              </Column>
            </Row>
          </Section>

          <Text>
            Our team will contact you shortly with further details.If you have any questions, feel free to
            contact Us.
          </Text>

          <Text>
            We look forward to seeing you at the workshop.
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