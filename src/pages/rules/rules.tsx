import { useEffect, useState } from "react";
import { Card, Text, Title, Container, List, Divider, ActionIcon, Affix, Transition } from "@mantine/core";
import { useWindowScroll } from '@mantine/hooks'; // Til scroll-håndtering
import { IconArrowNarrowUp } from '@tabler/icons-react';

export default function rules() {
    interface Rule {
        number: string;
        content: string;
      }
    
      interface Category {
        category: string;
        rules: Rule[];
      }
    
      const [rules, setRules] = useState<Category[]>([]);
      const [scroll, scrollTo] = useWindowScroll(); // Brug scroll-hook fra Mantine
    
      useEffect(() => {
        const loadRules = async () => {
          try {
            const config = await import("./config.json");
            setRules(config.serverRules);
          } catch (error) {
            console.error("Error loading config.json:", error);
          }
        };
    
        loadRules();
      }, []);
    
      const renderContent = (rule: Rule) => {
        // Tilføj betinget rendering for reglen med linket
        if (rule.content === "CitizenFX ToS skal overholdes.") {
          return (
            <>
              CitizenFX ToS skal overholdes.{" "}
              <a
                href="https://runtime.fivem.net/platform-license-agreement-12-sept-2023.pdf"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: "#3498db" }}
              >
                Læs her
              </a>
            </>
          );
        }
    
        return rule.content;
    };

    return (
    <div>
      <Container size="md" my="xl">
        <Title order={1}>Resident Server Regler</Title>
        <Divider my="md" />
        {rules.map((category, index) => (
          <div key={index} style={{ display: 'flex', alignItems: 'stretch', marginBottom: '20px' }}>
            {/* Den blå linje til venstre */}
            <div/>
            <Card shadow="sm" p="lg" style={{ flex: 1 }}>
              <Title order={2}>{category.category}</Title>
              <Divider my="md" />
              <List spacing="sm" withPadding>
                {category.rules.map((rule, subIndex) => (
                  <List.Item key={subIndex}>
                    <Text>
                      <strong>{rule.number}:</strong> {renderContent(rule)}
                    </Text>
                  </List.Item>
                ))}
              </List>
            </Card>
          </div>
        ))}
      </Container>

      {/* Tilbage til toppen-knap */}
      <Affix position={{ bottom: 20, left: 20 }}>
        <Transition transition="slide-up" mounted={scroll.y > 200}>
          {(styles) => (
            <ActionIcon variant="light" size="lg" radius="xs" aria-label="Settings" onClick={() => scrollTo({ y: 0 })}>
                <IconArrowNarrowUp style={{ width: '70%', height: '70%' }} stroke={1.5} />
            </ActionIcon>
          )}
        </Transition>
      </Affix>
    </div>
    )
}
