<?php
/**
 * Created by PhpStorm.
 * User: tema
 * Date: 1/22/19
 * Time: 1:41 PM
 */

namespace App\Form;

use App\Entity\User;
use Symfony\Component\OptionsResolver\OptionsResolver;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\Form\Extension\Core\Type\TextType;
use Symfony\Component\Form\Extension\Core\Type\ChoiceType;
use Symfony\Component\Form\Extension\Core\Type\SubmitType;

class UserType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder
            ->add('lastname',  TextType::class, ['label' => 'Фамилия'])
            ->add('firstname', TextType::class, ['label' => 'Имя'])
            ->add('patname',   TextType::class, ['label' => 'Отчество'])
            ->add('status',    ChoiceType::class, [
                'label' => 'Статус',
                'choices'  => [
                    'Первый' => 1,
                    'Второй' => 2,
                    'Третий' => 3,
                ],
            ])
            ->add('save', SubmitType::class, ['label' => 'Сохранить']);
        if (!empty($options['data']->getId())) {
            $builder->add('delete', SubmitType::class, [
                'label' => 'Удалить',
                'attr' => ['class' => 'btn-danger'],
            ]);
        }
        dump($options);
    }

    public function configureOptions(OptionsResolver $resolver)
    {
        $resolver->setDefaults([
            'data_class' => User::class,
        ]);
    }
}