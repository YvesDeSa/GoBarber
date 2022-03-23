import React, { useCallback, useEffect, useMemo, useState } from "react";
import DayPicker, { DayModifiers } from "react-day-picker";
import { isToday, format } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';

import 'react-day-picker/lib/style.css';

import { Container, Header, HeaderContainer, Profile, Content, Schedule, Calendar, NextAppointment, Section, Appointment } from "./style";

import logoImg from '../../assets/logo.svg';
import { FiClock, FiPower } from "react-icons/fi";
import useAuth from "../../hooks/auth";
import api from "../../services/api";

interface IMonthAvailability {
  day: number;
  available: boolean;
}

interface IAppointments {
  id: string;
  date: string;
  user: {
    name: string;
    avatar_url: string;
  }
}

export const Dashboard: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [monthAvailability, setMonthAvailability] = useState<IMonthAvailability[]>([]);
  const [appointments, setAppointments] = useState<IAppointments[]>([]);

  const { signOut, user } = useAuth();

  const handleDateChange = useCallback((day: Date, modifiers: DayModifiers) => {
    if (modifiers.available) {
      setSelectedDate(day);
    }
  }, []);

  const handleMonthChange = useCallback((month: Date) => {
    setCurrentMonth(month);
  }, []);

  useEffect(() => {
    api.get(`/providers/${user.id}/month-availability`, {
      params: {
        year: currentMonth.getFullYear(),
        month: currentMonth.getMonth() + 1
      }
    }).then(response => {
      setMonthAvailability(response.data);
    })
  }, [currentMonth, user.id]);

  useEffect(() => {
    api.get('/appointments/me', {
      params: {
        year: selectedDate.getFullYear(),
        month: selectedDate.getMonth() + 1,
        day: selectedDate.getDate()
      }
    }).then(response => {
      setAppointments(response.data);
      console.log(response.data)
    })
  }, [selectedDate]);

  const disabledDays = useMemo(() => {
    const dates = monthAvailability
      .filter(monthDay => monthDay.available === false)
      .map(monthDay => {
        const month = currentMonth.getMonth();
        const year = currentMonth.getFullYear();
        return new Date(year, month, monthDay.day);
      });
    return dates;
  }, [currentMonth, monthAvailability]);

  const seletedDateAsText = useMemo(() => {
    return format(selectedDate, "'Dia' dd 'de' MMMM", {
      locale: ptBR,
    })
  }, [selectedDate])

  const seletedWeekDay = useMemo(() => {
    return format(selectedDate, 'cccc', {
      locale: ptBR,
    })
  }, [selectedDate])

  return (
    <Container>
      <Header>
        <HeaderContainer>
          <img src={logoImg} alt="GoBarber" />

          <Profile>
            <img src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png" alt={user.name} />
            <div>
              <span>Bem vindo</span>
              <strong>{user.name}</strong>
            </div>
          </Profile>

          <button type="button" onClick={signOut}>
            <FiPower />
          </button>
        </HeaderContainer>
      </Header>

      <Content>
        <Schedule>
          <h1>Horarios agendados</h1>
          <p>
            {isToday(selectedDate) && <span>Hoje</span>}
            <span>{seletedDateAsText}</span>
            <span>{seletedWeekDay}</span>
          </p>

          <NextAppointment>
            <strong>Atendimento a seguir</strong>

            <div>
              <img src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png" alt="" />

              <strong>{user.name}</strong>
              <span>
                <FiClock />
                08:00
              </span>
            </div>
          </NextAppointment>

          <Section>
            <strong>Manhã</strong>
            <Appointment>
              <span>
                <FiClock />
                08:00
              </span>

              <div>
                <img src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png" alt="" />

                <strong>{user.name}</strong>
              </div>
            </Appointment>

            <Appointment>
              <span>
                <FiClock />
                08:00
              </span>

              <div>
                <img src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png" alt="" />

                <strong>{user.name}</strong>
              </div>
            </Appointment>
          </Section>

          <Section>
            <strong>Tarde</strong>
            <Appointment>
              <span>
                <FiClock />
                08:00
              </span>

              <div>
                <img src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png" alt="" />

                <strong>{user.name}</strong>
              </div>
            </Appointment>
          </Section>

        </Schedule>

        <Calendar>
          <DayPicker
            weekdaysShort={['D', 'S', 'T', 'Q', 'Q', 'S', 'S']}
            disabledDays={[
              { daysOfWeek: [0, 6] },
              ...disabledDays
            ]}
            modifiers={{
              available: { daysOfWeek: [1, 2, 3, 4, 5] }
            }}
            onDayClick={handleDateChange}
            selectedDays={selectedDate}
            onMonthChange={handleMonthChange}
            months={[
              'Janeiro',
              'Fevereiro',
              'Março',
              'Abril',
              'Maio',
              'Junho',
              'Julho',
              'Agosto',
              'Setembro',
              'Outubro',
              'Novembro',
              'Dezembro',
            ]}
            fromMonth={new Date()}
          />
        </Calendar>
      </Content>
    </Container>
  );
}